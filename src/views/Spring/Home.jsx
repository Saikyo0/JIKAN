import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [watch, setWatch] = useState(null);

  useEffect(() => {
    // Fetch watch data from the Spring Boot backend
    fetch('http://localhost:8080/api/v1/watches/1') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setWatch(data))
      .catch(error => console.error('Error fetching watch data:', error));
  }, []);

  return (
    <>
      <style>{`.main { padding-top: 60px; align-items: center; height: 1000px}`}</style>
      <div className="container" style={{ height: "1900px" }}>
        <div className="topSection">
          <button className="catalogButton" onClick={() => { window.location = "/shop" }}>
            <img
              src="/icons/explore.png"
              alt="Explore Icon"
              style={{ width: "20px", height: "auto", marginRight: "10px" }}
            />
            EXPLORE - CATALOGUE
          </button>
          <div>
            <h2 className="tagline">創造性と貢献。</h2>
            <p className="subTagline">Creativity and contribution.</p>
          </div>
          <div className="navLinks">
            <span>QUALITY +</span>
            <span>RIGIDITY +</span>
            <span>STYLE +</span>
          </div>
        </div>

        <main className="main">
          <div className="rightText">
            <div style={{ display: "flex", alignItems: "center", paddingbottom: "20px", width: "90vw" }}>
              <div
                style={{
                  height: "35px",
                  width: "35px",
                  backgroundColor: "#abafb3",
                  borderRadius: "50%"
                }}
              />
              <div
                style={{
                  height: "35px",
                  width: "35px",
                  backgroundColor: "#47484f",
                  borderRadius: "50%",
                  marginLeft: "-15px"
                }}
              />
              <p style={{ margin: "0 0 0 10px", fontSize: "16px", fontWeight: "bold", width: "80px", fontFamily: "Glacial" }}>
                CASIO +<br></br>G-SHOCK
              </p>
            </div>
          </div>
          <div className="rightSection">
            <div className="watchContainer">
              {watch ? (
                <>
                  <div className="productInfo">
                    <h3>{watch.title}</h3>
                    <p className="productDescription">
                      {watch.description}
                    </p>
                    <div className="buttonsContainer">
                      <a className="learnMore" href={watch.learnMoreUrl}>Learn more</a>
                      <button className="shopNow" onClick={() => { console.log(watch); navigate('/item', { state: { watch } });  }}>Shop now</button>
                    </div>
                  </div>
                  <img
                    className="watchImage"
                    src={watch.image}
                    alt={watch.title}
                  />
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="rightText">
              <h3>無駄のない設計と施工。</h3>
              <p className="textAlignRight">No-nonsense design and construction.</p>
              <p className="textLeft">
                Combining Toughness of Spirit with the Wonders of Technology.
              </p>
            </div>
          </div>
          <div className="floater">
            <p style={{fontWeight: "bold"}}>絶対的なタフネスのブ ランド</p>
          </div>
          <div className="brands">
            <img src="/brands/casio.png" alt="G-SHOCK Watch" />
            <img src="/brands/orient2.png" style={{ width: "290px", height: "auto", maxHeight: "none" }} alt="G-SHOCK Watch" />
            <img src="/brands/citizen.png" alt="G-SHOCK Watch" />
            <img src="/brands/seiko.png" alt="G-SHOCK Watch" />
          </div>
          <div className="homeAbout">
            <p>At JIKAN, our mission is to connect you with the heart of Japanese craftsmanship, offering timepieces that do
              more than just tell time; they enrich your daily life with precision and style. We believe in the power of innovation
              and tradition, curating watches that embody both cutting-edge technology and timeless design, reflecting the diverse needs and tastes of our customers.
              Our selection features iconic brands like Seiko, Casio, Citizen, and Orient, each renowned for their unique contributions to the world of horology.
              With a focus on functionality and aesthetic appeal, our timepieces cater to a wide array of lifestyles, whether you’re an adventurer seeking
              durability, a professional needing reliability, or a style enthusiast desiring elegance. At JIKAN, we are dedicated to enhancing your experience
              through thoughtful curation and exceptional service, ensuring that every watch we offer resonates with your personal journey and aspirations.
            </p>
            <p id="japAbout">JIKAN の使命は、あなたを日本の職人技の心と結び付け、単に時間を伝えるだけではない時計を提供することです。正確かつスタイリッシュにあなたの日常生活を豊かにします。
              私たちは革新と伝統の力を信じ、最先端のテクノロジーと時代を超越したデザインの両方を体現し、お客様の多様なニーズと好みを反映した時計を厳選しています。当社のセレクションには、
              セイコー、カシオ、シチズン、オリエントなどの象徴的なブランドが含まれており、それぞれが時計の世界への独自の貢献で知られています。機能性と美しさを重視した当社の時計は、耐久性を求める冒険家、
              信頼性を求めるプロフェッショナル、またはエレガンスを求めるスタイル愛好家など、幅広いライフスタイルに対応します。 JIKAN では、思慮深いキュレーションと優れたサービスを通じてお客様の体験を向上させることに専念し、
              当社が提供するすべての時計がお客様の個人的な旅や願望に確実に共鳴するように努めています。
            </p>
          </div>

          <div className="contact">
            <div className="contactAbout">
              <div className="transfer">
                <img src="/transfer/visa.svg" className='ticon' />
                <img src="/transfer/ae.png" className='ticon' />
                <img src="/transfer/om.png" className='ticon' />
                <img src="/transfer/pp.png" className='ticon' />
                <img src="/transfer/disc.svg" className='ticon' />
                <img src="/transfer/mc.png" className='ticon' />
              </div>
              <div className='reddot' />
              <div className='contactlinks' id='contactlinks'>
                <h3>Connect with Us:</h3>
                <p>
                  Call Us: +800000000077 (Existing Order Only) <br />
                  Opening Hours for Calls: <br />
                  Monday to Friday 10:00 - 16:00 (Japan Time) <br />
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
