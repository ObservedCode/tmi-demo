class ChatModule {
    constructor(config) {
        this.mountNode = config.mountNode;
        this.client = new tmi.Client({
            channels: ['observed_']
        });
        this.client.connect();
        this.messages = document.querySelector(this.mountNode);
        this.bindEventListeners();
    }
    bindEventListeners() {
        this.client.on('message', (channel, tags, message, self) => {
            console.log({ channel, tags, message, self });
            let possibleCommand = message.split(" ")[0];
            let displayName = tags["display-name"];
            messages.insertAdjacentHTML("beforeend", this.createCard(`${displayName}: ${message}`));
            let utterance;
            switch (possibleCommand) {
                case "!cow":
                    utterance = new SpeechSynthesisUtterance("moo");
                    speechSynthesis.speak(utterance);
                    break;

                case "!chicken":
                    utterance = new SpeechSynthesisUtterance("bock bock");
                    speechSynthesis.speak(utterance);

                default:
                    utterance = new SpeechSynthesisUtterance(message);
                    speechSynthesis.speak(utterance);
                    break;
            }
        });
    }

    renderBillIcon(msg) {
        console.log(typeof msg)
        return msg.replace(/bill/ig, `<img src="http://www.fillmurray.com/30/30" />`)
    }

    getRandomHex() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    createCard(msg) {
        console.log(msg);
        return `<div class="card" style="background-color: ${this.getRandomHex()}; color:${this.getRandomHex()}">${this.renderBillIcon(msg)}</div> `;
    }
}

new ChatModule({ mountNode: "#messages" });