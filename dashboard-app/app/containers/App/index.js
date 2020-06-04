/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import StarWarsInfo from '../StarWarsInfo/Loadable';
import MyFavouriteSW from "../MyFavouriteSWList/Loadable";
import SideBar from "../../components/SideBar";
import EmployeeListing from "../EmployeesListing/Loadable";
import EmployeeDetail from "../EmployeeDetail/Loadable";
import AddEditEmployee from "../AddEditEmployee/Loadable";
import EmployeeStatusBoard from "../EmployeeStatusBoard/Loadable"
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

function App({
  history
}) {
  useEffect(()=>{
    const unListen = history.listen(()=>{
      const scrollingEle = document.getElementsByClassName("page-body");
      if(scrollingEle && scrollingEle[0]){
        scrollingEle[0].scrollTop = 0;
      }
    });
    return () => {
      unListen();
    }
  },[history])
  return (
    // <AppWrapper>
    //   <Helmet
    //     titleTemplate="%s - React.js Boilerplate"
    //     defaultTitle="React.js Boilerplate"
    //   >
    //     <meta name="description" content="A React.js Boilerplate application" />
    //   </Helmet>
    //   <Header />
     
    //   <Footer />
    //   <GlobalStyle />
    // </AppWrapper>
    <>
      <SideBar />
      <div className="data-panel">
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/features" component={FeaturePage} /> */}
          <Route path="/starwarsinfo/:catId/:catItemId?" component={StarWarsInfo} />
          <Route path="/myfavourite" component={MyFavouriteSW} />
          <Route exact path="/employee/addEdit/:id?" component={AddEditEmployee} />
          <Route exact path="/employeedashboard" component={EmployeeStatusBoard}></Route>
          <Route exact path="/employee/:id" render={
            (props) => {
              const pageId = props.match.params.id;
              let component = null;
              switch(pageId){
                case "listing": {
                  component = <EmployeeListing {...props}></EmployeeListing>;
                  break;
                }
                default:{
                  component = <EmployeeDetail {...props}></EmployeeDetail>;
                  break;
                }
              }
              return component;
            }
          } />
          
         
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
   </>
  );
}
export default withRouter(App)
