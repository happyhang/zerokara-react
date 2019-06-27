import * as React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import logo from 'assets/images/logo.png';
import { init } from './homePageDucks.gen';


const HomePage = ({ onInit }) => {
  React.useEffect(() => { onInit(); }, []);

  return (
    <div className="wrap">
      <div>
        <img src={logo} alt="Logo" />
        <h1>
          <span role="img" aria-label="Hi">👋</span>
          Hello from &apos;zerokara-react&apos;
        </h1>
        <p>
          If you are seeing this page.
          You have successfully started this project successfully (yay
          <span role="img" aria-label="party">🎉</span>
          )!
          <br />
          There are some documentation on&nbsp;
          <span role="img" aria-label="book">📖</span>
          README.md that tells you what you can do next, please have a read!
        </p>
        <p>
          If you have any&nbsp;
          <span role="img" aria-label="question">❓</span>
          issues or questions, please try to raise an issue in GitHub!
          <br />
          If you like this, please give a support by giving a ⭐ to the repo! 😛
        </p>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  onInit: PropTypes.func,
};

const mapDispatchToProps = {
  onInit: init,
};

export default connect(null, mapDispatchToProps)(HomePage);
