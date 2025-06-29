import Navbar from "../Components/Navbar/Navbar";
import "../Styles/Contact.css";
function Contact() {
  return (
    <>
      <div className="visit_container vh-100">
        <Navbar />
        <div className="hero">
          <div className="contactUs">
            <h2>Contactează-ne</h2>

            <div className="box">
              <div className="contact form">
                <h3>Trimite un mesaj</h3>
                <form>
                  <div className="formBox">
                    <div className="row50">
                      <div className="inputBox">
                        <span>Nume</span>
                        <input type="text" placeholder="Popescu" />
                      </div>
                      <div className="inputBox">
                        <span>Prenume</span>
                        <input type="text" placeholder="Andrei" />
                      </div>
                    </div>
                    <div className="row50">
                      <div className="inputBox">
                        <span>Email</span>
                        <input
                          type="text"
                          placeholder="popescuandrei@gmail.com"
                        />
                      </div>
                      <div className="inputBox">
                        <span>Telefon</span>
                        <input type="text" placeholder="0749684325" />
                      </div>
                    </div>

                    <div className="row100">
                      <div className="inputBox">
                        <span>Mesaj</span>
                        <textarea name="Lasati un mesaj"></textarea>
                      </div>
                    </div>

                    <div className="row100">
                      <div className="inputBox">
                        <div className="btn-contact">Trimite</div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="contact info">
                <h3>Informații de contact</h3>
                <div className="infoBox">
                  <div>
                    <span></span>
                    <p>Adresa: Bulevardul Timisoara 35</p>
                  </div>

                  <div>
                    <span></span>
                    <p>Mail: happyPaws@gmail.com</p>
                  </div>

                  <div>
                    <span></span>
                    <p>Telefon: 0751489587</p>
                  </div>
                </div>
              </div>

              <div className="contact map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22794.245696356335!2d26.019125549544185!3d44.42740374883078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201ca73ab9aaf%3A0xaae7fe67b71efc43!2sBloc%20OD6%2C%20Bd.%20Timi%C8%99oara%2035%2C%20Bucure%C8%99ti%20061344!5e0!3m2!1sro!2sro!4v1715802243707!5m2!1sro!2sro"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allow="fullscreen"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
