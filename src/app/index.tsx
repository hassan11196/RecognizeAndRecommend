/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { RecognitionPage } from './containers/RecognitionPage'
import { NotFoundPage } from './containers/NotFoundPage/Loadable';


export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Recognize	&amp; Recommend"
        defaultTitle="Recongnize and Recommend"
      >
        <meta name="description" content="Facial Recognition and Recommendation System based Web application" />
      </Helmet>

      <Switch>
        {/* <Route exact path={process.env.PUBLIC_URL + '/'} component={HomePage} /> */}
        <Route exact path={process.env.PUBLIC_URL + "/"} component={RecognitionPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
