import { useGlobalState } from '../../App';
import './UserAgreement.css';

const UserAgreement = () => {
  const globalState = useGlobalState();
  // const userAgreement = globalState.userAgreement;
  const setUserAgreement = globalState.setUserAgreement;
  const setWhiteBlock = globalState.setWhiteBlock;

  const onClickHandler = (e, stateBoolean, whiteBlockBoolean) => {
    const agreementDiv = e.target.parentElement;
    e.preventDefault();
    setUserAgreement(stateBoolean);
    setWhiteBlock(whiteBlockBoolean);
    agreementDiv.style.display = 'none';
  };

  return (
    <section id="user-agreement-wrapper">
      <h2>We would like to use your location</h2>
      <h2>Do you agree?</h2>
      <button
        onClick={(e) => {
          onClickHandler(e, true, false);
        }}
        className="user-agreement-button"
      >
        Yes
      </button>
      <button
        onClick={(e) => {
          onClickHandler(e, false, false);
        }}
        className="user-agreement-button"
      >
        No
      </button>
    </section>
  );
};

export default UserAgreement;
