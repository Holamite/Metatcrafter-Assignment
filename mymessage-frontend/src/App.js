import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import contractABI from "./abi.json";
import { useState } from "react";
function App() {
  const contractAddress = "0x934932752EDDeb6150e412E04D747bd974164A7d";
  const [messages, setMessages] = useState("");
  const [newMessages, setNewMessages] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.setMessage("Just they play");
        await transaction.wait();

        console.log("Message Set");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function getMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getMessage();
        // await transaction.wait();
        setNewMessages(messages);
        console.log("Message Retrieved");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          style={{
            padding: "12px 24px",
            color: "white",
            background: "black",
          }}
          onClick={getMessage}
        >
          Get Messages
        </button>
        <p>{newMessages}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>
          {" "}
          <input
            type="text"
            placeholder="write your message..."
            onChange={(e) => {
              setMessages(e.target.value);
            }}
            style={{
              padding: "12px 24px",
              width: "500px",
            }}
          />
          <button
            style={{
              padding: "12px 24px",
              color: "white",
              background: "black",
            }}
            onClick={setMessage}
          >
            Set Message
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
