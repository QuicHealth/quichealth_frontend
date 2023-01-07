import React, { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";
import gsap from "gsap";
import styled from "styled-components";
import Footer from "../components/Footer";
import HowItWork from "../components/HowItWork";
import LandingSection from "../components/LandingSection";
import NavBar from "../components/NavBar";
import OurServices from "../components/OurServices";
import WhyQuicHealth from "../components/WhyQuicHealth";
import { ContactSupportOutlined } from "@material-ui/icons";

function HomePage() {
  const sectionRef = useRef(null);
  const sectRef = useRef(null);
  const [ref, setRef] = useState(null);
  const intersection = useIntersection(sectRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  const fadeIn = (element) => {
    gsap.to(element, 1, {
      opacity: 1,
      y: -60,
      ease: "power4.out",
      stagger: {
        amount: 0.3,
      },
    });
  };

  const fadeOut = (element) => {
    gsap.to(element, 1, {
      opacity: 0,
      y: -20,
      ease: "power4.out",
    });
  };

  const options = {
    root: null,
    rootMargin: " 0px",
    threshold: 0,
  } 


  //images.length>0 ?observer.observe(images[0]): console.log(false)


  //intersection && intersection.intersectionRatio < 0.5
    //? fadeOut(".fadeIn")
   // : fadeIn(".fadeIn");
   useEffect(() => {

    const images = document.querySelectorAll(".fadeIn");
    console.log(images.length);
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry=> {
          if (entry.isIntersecting){
              //entry.target.classList.add('in-view');
              entry.target.style.animation= 'animate-in-view 2s ease-in-out'
              //fadeIn(".in-view");
          } else {
             // entry.target.classList.remove('in-view');
              entry.target.style.animation= 'none'
              //return;
          }
      })
    }, options);
  
        images.forEach(image => {
        observer.observe(image);
        });
   },[])

  return (
    <Container >
      <NavBar />
      <LandingSection />
      <OurServices />
      <WhyQuicHealth />
      <HowItWork />
      <Footer />
    </Container>
  );
}

export default HomePage;
const Container = styled.div`
  overflow-x: hidden;
`;
