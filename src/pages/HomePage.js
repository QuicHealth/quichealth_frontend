import React , { useRef,useState} from 'react'
import { useIntersection} from "react-use";
import gsap from "gsap";
import styled from 'styled-components';
import Footer from '../components/Footer';
import HowItWork from '../components/HowItWork';
import LandingSection from '../components/LandingSection';
import NavBar from '../components/NavBar';
import OurServices from '../components/OurServices';
import WhyQuicHealth from '../components/WhyQuicHealth';
import { ContactSupportOutlined } from '@material-ui/icons';

function HomePage() {
    const sectionRef = useRef(null);
    const sectRef = useRef(null);
    const[ref, setRef] = useState(null)
    const intersection= useIntersection(sectRef, {
        root: null,
        rootMargin: "0px",
        threshold: .5
    });
    
    const fadeIn = (element) => {
        gsap.to(element, 1, {
            opacity: 1,
            y: -60,
            ease: 'power4.out',
            stagger: {
                amount: .3
            }
        })
    }

        const fadeOut = (element) => {
        gsap.to(element, 1, {
            opacity: 0,
            y: -20,
            ease: 'power4.out',
        })
    }


    intersection && intersection.intersectionRatio < .5? fadeOut(".fadeIn") : fadeIn(".fadeIn");
    
    return (
        <Container>
            <NavBar />
            <LandingSection />
            <OurServices sectRef={sectRef} />
            <WhyQuicHealth sectionRef={sectionRef} />
            <HowItWork sectionRef={sectionRef} />
            <Footer />
        </Container>
    )
}

export default HomePage
const Container = styled.div`
    overflow-x:hidden;
`;