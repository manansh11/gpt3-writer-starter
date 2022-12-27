import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('test');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);


  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log('CALLING OPENAI...');
    try{
      const respose = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({userInput}),
      });
  
      const data = await respose.json(); // convert response to json
      const { output } = data; // pull out output
      console.log(output);
      console.log("OpenAI replied...", output.text);
  
      setApiOutput(`${output.text}`)
      setIsGenerating(false);
    } catch (e) {
      console.error(e)
    }

  }


  const onUserChangedText = (e) => {
    setUserInput(e.target.value);
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 WRITER MANANSH</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Krishna Lessons:</h1>
          </div>
          <div className="header-subtitle">
            <h2>Get custom-made lessons from Krishna himself.</h2>
          </div>
        </div>
        <div className='prompt-container'>
          <textarea placeholder='what lesson would you like to learn?' className='prompt-box' value={userInput} onChange={onUserChangedText}/>
        </div>
        <div className='prompt-buttons'>
          <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
            <div className='generate'>
              {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className='output'>
            <div className='output-header-container'>
              <div className='output-header'>
                <h3>Output</h3>
              </div>
            </div>
            <div className='output-content'>
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
