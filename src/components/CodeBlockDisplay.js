import { CodeBlock } from 'react-code-blocks';

export default function CodeBlockDisplay(props) {
  return (
    <CodeBlock
      text={props.code}
      language='json'
      showLineNumbers={true}
      theme='dracula'
      wrapLines
    />
  );
}