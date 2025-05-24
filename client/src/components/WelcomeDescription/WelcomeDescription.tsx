import s from './WelcomeDescription.module.css';

const WelcomeDescription = () => {
  return (
    <>
      <h1 className={s.title}>Welcome to Management Boards! 👋</h1>
      <p className={s.text}>
        Organize tasks anonymously and effortlessly. Simply enter a Board ID to
        join an existing board, or create a new one with a unique ID. No
        sign-ups, no hassle – just pure collaboration.
      </p>
      <h2 className={s.pre_title}>To get started, you can:</h2>
      <ul className={s.list}>
        <li>
          Use the 'Load form' at the top of this page to load an existing board.
        </li>
        <li>Use 'Create form' below to create a new board.</li>
      </ul>
    </>
  );
};

export default WelcomeDescription;
