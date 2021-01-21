import React from 'react';
import { Layout } from 'antd';
import Header from '../components/PageLayout/Header';

import SidebarWrapper from '../components/PageLayout/Sidebar';
import Highlight from '../components/PageFragments/HomePage/Highlight';
import Skills from '../components/PageFragments/HomePage/SkillProgress';

export default () => (
  <Layout className="outerPadding">
    <Layout className="container">
      <Header />
      <SidebarWrapper>
        <>
          <Highlight />
          <Skills />
        </>
      </SidebarWrapper>
    </Layout>
  </Layout>
);
