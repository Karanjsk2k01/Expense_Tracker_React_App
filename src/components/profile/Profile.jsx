import React from 'react';
import classes from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const history = useNavigate();

  const redirectHandler = () => {
    history('/Home')
  }



  return (
    <section className={classes.Profile}>
      <div className={classes.wrapper}>
        <div className={classes.ProfileWrapper}>
          <h1>Contact Details</h1>
          <form>
            <div className={classes.control}>
              <label htmlFor='fullName'>
                <FontAwesomeIcon icon={faGithub} />
                <span style={{ padding: '0 20px' }}>Full Name</span>
              </label>
              <input type='text' id='full-name' required />
            </div>
            <div className={classes.control}>
              <label htmlFor='profileUrl'>
                <FontAwesomeIcon icon={faGlobe} />
                <span style={{ padding: '0 20px' }}>Profile URL</span>
              </label>
              <input type='text' id='profileUrl' required />
            </div>
            <div className={classes.buttonControl}>
              <button type='button' className={classes.toggle1}>
                Update
              </button>
              <button type='button' className={classes.toggle2} onClick={redirectHandler}>
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
