import { useState } from 'react';
import Head from 'next/head'
import Image from "next/image";
import Login from '../components/Login';
import Signup from '../components/Signup';
import {
  AuthGrid,
  AuthColumn1,
  AuthColumn2,
  ContentArea,
  LogoArea
} from '../styles/Home';
import { useAuthentication } from "../contexts/Authentication";

import UserService from '../services/UserService';
import router from 'next/router';

export default function Home() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState('login');

  const login = (e) => {
    e.preventDefault();
    UserService.login({ username, password })
      .then(_ => {
        router.replace('chats');
      })
      .catch(error => setError(error.response.data.message))
  }

  const signUp = (e) => {
    e.preventDefault();
    UserService.createAccount({ username, password, email })
      .then(_ => {
        router.replace('chats');
      })
      .catch(error => setError(error.response.data.message))
  }

  return (
    <AuthGrid>
      <Head>
        <title>WorldChat</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <AuthColumn1>
        <LogoArea>
            <Image src="/assets/icons/world.png" height={90} width={90} alt="logo" />
            <div className="title-area">
                <h3>WorldChat</h3>
            </div>
        </LogoArea>

        <ContentArea>
          <div className="description-area">
              <h3>Converse com pessoas do mundo todo, crie salas e faça novas amizades.</h3>
          </div>
          <Image src="/assets/icons/chat-video.gif" height={256} width={256} alt="logo" />
        </ContentArea>
      </AuthColumn1>

      <AuthColumn2>
        {
          currentPage == 'login' ?
            <Login
              sets={{ setUsername, setEmail, setPassword }}
              setCurrentPage={setCurrentPage}
              login={login}
              error={error}
            />
            :
            <Signup
              sets={{ setUsername, setEmail, setPassword }}
              setCurrentPage={setCurrentPage}
              signUp={signUp}
              error={error}
            />
        }
      </AuthColumn2>
    </AuthGrid>
  )
}

export async function getServerSideProps({ req }) {
  const current_user_stored = req.cookies.user;

  if (current_user_stored) {
    return {
      redirect: {
        destination: '/chats',
        permanent: false,
      },
    }
  }

  return { props: {} }
}
