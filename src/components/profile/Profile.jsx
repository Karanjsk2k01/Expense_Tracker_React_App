import React, { useEffect, useState } from 'react';
import classes from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [loader, setloader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fullName, setFullName] = useState('');
  const [profileUrl, setprofileUrl] = useState('');
  const history = useNavigate();

  const redirectHandler = () => {
    history('/')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idToken = localStorage.getItem('token');

        if (!idToken || idToken === null) {
          console.log('token expired');
          alert('Please login again to continue');
          history('/Auth');
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBxqP5SfeSM8fgzRarxiwEgZ4kJ5v7JZsA';

        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            idToken: idToken,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          let data = await res.json();
          throw new Error(data.error.message);
        }

        const data = await res.json();

        const { displayName, photoUrl } = data.users[0]

        setFullName(displayName || '');
        setprofileUrl(photoUrl || '');

        console.log(displayName, photoUrl);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);


  const updateProfileHandler = async (e) => {
    e.preventDefault();

    const enteredFullName = fullName;
    const enteredProfileURL = profileUrl;

    const idToken = localStorage.getItem('token');

    if (idToken === null) {
      console.log('token expired')
      alert('Please login again to continue')
      history('/Auth')
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBxqP5SfeSM8fgzRarxiwEgZ4kJ5v7JZsA'

    try {

      setloader(true);

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          idToken: idToken,
          displayName: enteredFullName,
          photoUrl: enteredProfileURL,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) {
        let data = await res.json()

        throw new Error(data.error.message)
      }

      const fetchedData = await res.json()

      console.log(fetchedData)

      setSuccess(true)

      setloader(false);

      // redirect to homepage
      if (res.ok) {
        setTimeout(() => {
          history('/');
        }, 2000);
      }


    } catch (error) {
      console.log(error.message)

    }
    finally {
      setloader(false)
    }


    e.target.reset()
  }



  return (
    <section className={classes.Profile}>
      <div className={classes.wrapper}>
        <div className={classes.ProfileWrapper}>
          <h1>Contact Details</h1>
          <form onSubmit={updateProfileHandler}>
            <div className={classes.control}>
              <label htmlFor='fullName'>
                <FontAwesomeIcon icon={faGithub} />
                <span style={{ padding: '0 20px' }}>Full Name</span>
              </label>
              <input type='text' id='full-name' required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className={classes.control}>
              <label htmlFor='profileUrl'>
                <FontAwesomeIcon icon={faGlobe} />
                <span style={{ padding: '0 20px' }}>Profile URL</span>
              </label>
              <input type='text' id='profileUrl' required value={profileUrl} onChange={(e) => setprofileUrl(e.target.value)} />
            </div>
            <div className={classes.buttonControl}>
              {!loader &&
                <button type='submit' className={classes.toggle1}>
                  Update
                </button>
              }
              {!loader &&
                <button type='button' className={classes.toggle2} onClick={redirectHandler}>
                  Cancel
                </button>
              }
              {loader &&
                <button type='submit' className={classes.toggle1}>
                  Updating...
                </button>
              }
            </div>
          </form>
        </div>
      </div>
      {success && <span className={classes.toast}>Profile Updated</span>}
    </section>
  );
};

export default Profile;
