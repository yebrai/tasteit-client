import "./intro.css";
import headImg from "./intro-main.png";
import step1 from "./step-1.png";
import step2 from "./step-2.png";
import step3 from "./step-3.png";
import step4 from "./step-4.png";
import emmaImg from "./emma.png";
import jhonImg from "./john.png";
import juliaImg from "./julia.png";
import valoracion from "./estrella.png";

function Intro() {
  return (
    <div>
      <section className="section-main">
        <section className="intro-start-container intro-section-container one">
          <div>
            <h1>Taste It!</h1>
            <p>
              Con esta app podras tanto pedir como vender tus propios platos!
            </p>
          </div>
          <img src={headImg} alt="" />
        </section>
        <section className="intro-steps-container intro-section-container two">
          <div className="intro-step">
            <h2>1º Paso</h2>
            <p>Seleciona tu comida preferida</p>
            <img src={step1} alt="" />
          </div>
          <div className="intro-step">
            <h2>2º Paso</h2>
            <p>Nos encargamos de enviarte la comida</p>
            <img src={step2} alt="" />
          </div>
          <div className="intro-step">
            <h2>3º Paso</h2>
            <p>Nuestros repartidores de entragaran la comida</p>
            <img src={step3} alt="" />
          </div>
          <div className="intro-step">
            <h2>4º Paso</h2>
            <p>Distruta de la comida y valora si te gusto la experiencia!</p>
            <img src={step4} alt="" />
          </div>
        </section>
        <section className="intro-footer-container intro-section-container three">
          <section className="users-valoration">
            <div>
              <h1>Valoraciones de nuestros usuarios</h1>
            </div>
            <div className="valoration-container">
              <div>
                <img className="userImg" src={emmaImg} alt="" />
                <h3>Emma</h3>
                <div className="valoration">
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <p>chapo</p>
                </div>
              </div>
              <div>
                <img className="userImg" src={jhonImg} alt="" />
                <h3>John Doe</h3>
                <div className="valoration">
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <p>chapo</p>
                </div>
              </div>
              <div>
                <img className="userImg" src={juliaImg} alt="" />
                <h3>Julia</h3>
                <div className="valoration">
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <p>chapo</p>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div className="developers-container">
            <h2>Desarrolladores</h2>
            <div>
              <img src="" alt="" />
              <a href="">Ivan Garcia Yebra</a>
              <img src="" alt="" />
            </div>
            <div>
              <img src="" alt="" />
              <a href="">Borja Cabello Luna</a>
            </div>
            </div>
            <div>
              <h3>Contactanos</h3>
              <div>
                <img src="" alt="" />
                <p></p>
                <img src="" alt="" />
              </div>
              <div></div>
            </div>
            <p>© Copyright Taste it 2022</p>
          </footer>
        </section>
      </section>
    </div>
  );
}

export default Intro;
