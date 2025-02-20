// 获取 HTML 元素
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');

// 初始化变量
let localStream;
let peerConnection;
const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
const socket = new WebSocket('ws://localhost:8080');

// 处理开始按钮点击事件
startButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = stream;
        localStream = stream;
        startButton.disabled = true;
        callButton.disabled = false;
        hangupButton.disabled = false;
    } catch (error) {
        console.error('获取媒体流时出错:', error);
    }
});

// 处理呼叫按钮点击事件
callButton.addEventListener('click', async () => {
    peerConnection = new RTCPeerConnection(configuration);

    // 添加本地流到连接
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // 处理 ICE 候选
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate }));
        }
    };

    // 处理远程流
    peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };

    try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.send(JSON.stringify({ type: 'offer', sdp: offer.sdp }));
    } catch (error) {
        console.error('创建邀请时出错:', error);
    }
});

// 处理挂断按钮点击事件
hangupButton.addEventListener('click', () => {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    localStream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    startButton.disabled = false;
    callButton.disabled = true;
    hangupButton.disabled = true;
});

// 处理信令服务器消息
socket.addEventListener('message', async (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
        case 'offer':
            peerConnection = new RTCPeerConnection(configuration);
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate }));
                }
            };

            peerConnection.ontrack = (event) => {
                remoteVideo.srcObject = event.streams[0];
            };

            await peerConnection.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: data.sdp }));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.send(JSON.stringify({ type: 'answer', sdp: answer.sdp }));
            break;
        case 'answer':
            await peerConnection.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: data.sdp }));
            break;
        case 'ice-candidate':
            if (peerConnection) {
                try {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                } catch (error) {
                    console.error('添加 ICE 候选时出错:', error);
                }
            }
            break;
    }
});