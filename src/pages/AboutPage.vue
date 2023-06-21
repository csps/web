<template>
  <div id="introduction">
    <h1 id="title">Why CSP-S</h1>
    <p id="welcome">Welcome to the  Computing Science of the Philippines - Students (CSP-S)! We are a student body organization that aims to create a welcoming and inclusive community for all computer science students at the University of Cebu - Main Campus. Our goal is to promote inclusivity and diversity within the field of computing, ensuring that every student has the opportunity to explore their interests and succeed in their academic and professional pursuits.</p>
    <p id="join">Join us at CSP-S and become part of a community that celebrates diversity and fosters growth and development for all students in the field of computer science. We welcome you with open arms!</p>
    <img id="csps" :src="Image"/>
  </div>
  <div id="introduction">
    <img id="line" :src="CLine"/>
    <h1 id="ccs">College of Computer Studies</h1>
  </div>
  <div id="state">
    <div id="mission">
      <h4 id="tile">Mission</h4>
      <p id="missions">We envision being the hub of quality, globally-competitive and socially-responsive information technology education</p>
    </div>
    <div id="mission">
      <h4 id="tile">Vision</h4>
      <p id="text">We commit to continuously:</p>
      <ul id="unorder">
        <li style="margin-bottom: 10px;">Offer relevant programs that mold well-rounded computing professionals;</li>
        <li style="margin-bottom: 10px;">Engage in accreditation and quality standards; and </li>
        <li style="margin-bottom: 10px;">Facilitate in building an IT-enabled nation.</li>
      </ul>
    </div>
    <div id="mission">
      <h4 id="tile">Goals</h4>
      <p id="text">We aim to cultivate a teaching-learning environment that:</p>
      <ul id="unorder">
        <li style="margin-bottom: 10px;">Promotes scholarly endeavors for the promotion of moral,social, cultural, and environmental interests;</li>
        <li style="margin-bottom: 10px;">Meets the demands of the industry in terms of technical,personal and interpersonal skills; Conducts intellectual, technological and significant researches in computing; and Optimizes the use of appropriate and advanced resources and services.</li>
      </ul>
    </div>
    <div id="mission">
      <h4 id="tile">Core Values</h4>
      <p id="text">These are the core values that CCS believes in:</p>
      <ul id="unorder">
        <li style="margin-bottom: 10px;">Initiative (inceptum) wit, practicality, ingenuity</li>
        <li style="margin-bottom: 10px;">Innovation (innovatio) technology, creativity, novelty</li>
        <li style="margin-bottom: 10px;">Service (muneris) industry, loyalty, courtesy</li>
      </ul>
    </div>
  </div>
  <div id="introduction">
    <img id="line" :src="ULine"/> 
    <h1 id="ccs">University of Cebu</h1>
    <div id="mv">
      <div id="ms">
        <h4 id="tile">Mission</h4>
        <p id="missions">The University offers affordable and quality education responsive to the demands of local and international communities.</p>
      </div>
      <div id="ms">
        <h4 id="tile">Vision</h4>
        <p id="missions">Democratize quality education.Be the visionary and industry leader.Give hope and transform lives.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Image from '~/assets/img/csps.png';
import CLine from "~/assets/img/ccs_line.png";
import ULine from "~/assets/img/uc_line.png";
</script>

<style lang="scss" scoped>
#introduction{
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 20px 20px 20px 35px;
}
#missions{
  text-align: center;
  padding: 20px;
}
#ms{
  background-color: #06203F;
  width: fit-content;
  max-width: 350px;
  color: white;
  border-radius: 20px;
  height: 350px;
}
#title{
  font-size: 40px;
  font-weight: bold;
  margin-top: 60px;
  color: #06203F;
}
#welcome{
  padding-top: 50px;
  font-size: 20px;
  margin-left: 400px;
  margin-right: 400px;
  padding-bottom: 50px;
}
#unorder{
  margin: auto;
  padding-left: 20px;
  list-style-position: inside;
  list-style-type: circle;
  padding-top: 20px;
  padding-right: 20px;
}
#state{
  display: grid;
  grid-auto-flow: column;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  gap: 5rem;
  padding-left: 50px;
  padding-bottom: 200px;
}
#mv{
  display: grid;
  grid-auto-flow: column;
  background-color: #ffffff;
  width: 70%;
  height: 100%;
  margin: auto;
  padding-left: 190px;

}
#mission{
  background-color: #06203F;
  width: fit-content;
  max-width: 350px;
  color: white;
  border-radius: 20px;
  height: 490px;

}
#tile{
  color: #D4A923;
  text-align: center;
  font-weight: bold;
  padding-top: 30px;
  font-size: 20px;
}
#text{
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
#join{
  font-size: 20px;
  margin-left: 400px;
  margin-right: 400px;
  padding-bottom: 50px;
}
#csps{
  margin: auto;
  padding-bottom: 90px;
}
#line{
  margin: auto;
}
#ccs{
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 50px;
  color: #06203F;
}
</style>