import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GoogleLoginButton, GithubLoginButton,TwitterLoginButton} from "react-social-login-buttons";



const Home = () => {

  const [queryType, setQueryType] = useState('');
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

const handleChange = (event) => {
  setQueryType(event.target.value);
};
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Ask me anything</h1>
          </div>
          <div className="header-subtitle">
            <h2>Get the answers Instantly with AI</h2>
          </div>
        </div>
        {/* <div>
        <GoogleLoginButton onClick={null} />
        <GithubLoginButton onClick={null} />
        <TwitterLoginButton onClick={null} />
      </div> */}
        {/* <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Query Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={null}
          label="Query Type"
          onChange={handleChange}
        >
          <MenuItem value={10}>MongoDB</MenuItem>
          <MenuItem value={20}>SQL</MenuItem>
        </Select>
      </FormControl>
    </Box> */}
        {/* Add this code here*/}
        <div className="prompt-container">
        <textarea
        className="prompt-box"
        placeholder="Enter the details"
        value={userInput}
        onChange={onUserChangedText}
/>;
<div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Submit</p>}
    </div>
  </a>
</div>
      {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>AI Response</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>0xSkay</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
