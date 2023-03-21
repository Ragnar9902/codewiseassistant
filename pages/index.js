import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import * as pdfjs from 'pdfjs-dist';


export default function Home() {

  const [question, setQuestion] = useState("");
  const [version, setVersion] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("version", version);
      let request = "i have been trying to do this: " + question
      

      if (version !== ""){
        request += "in a " + version + "machine"
      }
      request += ". with what command or series of commands can i achive this in my working  " + version + "machine"
      request += ".give the anwer just the command or the commands, and in this format: /tour-working-dir/> command"
      console.log(request)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
  
      const data = await response.json();
      console.log(JSON.stringify(data));
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
  
      setResult(data.result);
      setQuestion("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>CodeWise Linux Assistant</title>
        <link rel="icon" href="/command.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></link>
      </Head>

      <main className={styles.main}>
      <img src="command.png" className={styles.icon} />
        <form onSubmit={onSubmit}>
          <label>
          What are you trying to do?
            <input
              type="text"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Linux Version:
            <input
              type="text"
              name="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <button type="submit" className="btn">Ask</button>
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
