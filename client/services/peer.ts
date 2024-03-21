class PeerService {
    peer: RTCPeerConnection | null;

    constructor() {
        this.peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ]
                }
            ]
        })
    }

    async getoffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            // await this.peer.setLocalDescription(new RTCSessionDescription(offer))
            await this.peer.setLocalDescription(offer)
            return offer;
        }
    }

    async getAnswer(offer) {
        if (this.peer) {
            await this.peer.setRemoteDescription(offer);
            const answer = await this.peer.createAnswer();
            // await this.peer.setLocalDescription(new RTCSessionDescription(answer))
            await this.peer.setLocalDescription(answer)
            return answer;
        }
    }

    async setLocalDescription(ans) {
        if (this.peer) {
            console.log(ans)
            // await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
            if (!this.peer.currentRemoteDescription){
                await this.peer.setRemoteDescription(ans);
            }
        }
    }
}

export default new PeerService();

// class PeerService {
//     peer: RTCPeerConnection | null;

//     constructor() {
//         if (typeof window !== 'undefined' && 'RTCPeerConnection' in window) {
//             // Check if RTCPeerConnection is available in the window object
//             this.peer = new RTCPeerConnection({
//                 iceServers: [
//                     {
//                         urls: [
//                             "stun:stun.l.google.com:19302",
//                             "stun:global.stun.twilio.com:3478",
//                         ]
//                     }
//                 ]
//             });
//         } else {
//             this.peer = null;
//         }
//     }

//     async getOffer() {
//         if (this.peer) {
//             const offer = await this.peer.createOffer();
//             await this.peer.setLocalDescription(new RTCSessionDescription(offer));
//             return offer;
//         }
//     }

//     async getAnswer(offer) {
//         if (this.peer) {
//             console.log(offer)
//             await this.peer.setRemoteDescription(offer);
//             const answer = await this.peer.createAnswer();
//             await this.peer.setLocalDescription(new RTCSessionDescription(answer));
//             return answer;
//         }
//     }

//     async setLocalDescription(answer) {
//         if (this.peer) {
//             await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
//         }
//     }
// }

// export default new PeerService();
