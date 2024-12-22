// src/pages/Login.js
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';  // Firebase Authentication'ı import ediyoruz
import { useNavigate } from 'react-router-dom';  // Yönlendirme için useNavigate'i import ediyoruz
import app from '../firebaseConfig';


const auth = getAuth(app);  // Firebase Auth hizmetini başlatıyoruz (app'i burada kullanıyoruz)

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();  // navigate() ile yönlendirme işlemleri yapacağız

  const handleLogin = async (e) => {
    e.preventDefault();  // Formun submit olmasını engelliyoruz
    try {
      await signInWithEmailAndPassword(auth, email, password);  // Firebase ile giriş yapıyoruz
      navigate('/dashboard');  // Giriş başarılı olursa ana sayfaya yönlendiriyoruz
    } catch (error) {
      setError(error.message);  // Eğer bir hata varsa, hata mesajını gösteriyoruz
    }
  };

  // Kayıt ol sayfasına yönlendirme fonksiyonu
  const handleSignUpRedirect = () => {
    navigate('/signup');  // Kullanıcıyı kayıt ol sayfasına yönlendiriyoruz
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>"KULLANICI ADI veya ŞİFRE yanlış!!!"</p>}  {/* Hata mesajını göster */}

      {/* Kayıt ol butonu */}
      <button onClick={handleSignUpRedirect}>Kayıt Ol</button>
    </div>
  );
}

export default Login;
