import React, {Suspense, useState} from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Page from '@demo/components/Page';
import store from '@demo/store';
import '@demo/styles/common.scss';
import { history } from './utils/history';
import Home from '@demo/pages/Home';
import NotFound from "@demo/pages/Code/404";
import EnvReader from "@demo/services/Env/EnvReader";
import Security from "@demo/services/Security/Security";
import GlobalCustomReduxStorageService from "@demo/services/Storage/GlobalCustomReduxStorageService";
import {EditorComplexityEnum} from "@demo/enum/EditorComplexity";
import {LocalStorageReader} from "@demo/index";
import {createTeleporter} from "react-teleporter";

const EmailComplexityActionsTeleporter = createTeleporter();

const EditorPromise = import('@demo/pages/Editor');
const Editor        = React.lazy(() => EditorPromise);

GlobalCustomReduxStorageService.registerGlobalStore()

function App() {
  const [complexityMode, setComplexityMode] = useState(LocalStorageReader.getComplexityMode() ?? EditorComplexityEnum.simple);

  /**
   * @description set simple complexity mode
   */
  function setSimpleComplexityMode() {
    GlobalCustomReduxStorageService.setComplexityMode(EditorComplexityEnum.simple);
    LocalStorageReader.setComplexityMode(EditorComplexityEnum.simple);
    setComplexityMode(EditorComplexityEnum.simple);
  }

  /**
   * @description set the advanced complexity mode
   */
  function setAdvancedComplexityMode() {
    GlobalCustomReduxStorageService.setComplexityMode(EditorComplexityEnum.advanced);
    LocalStorageReader.setComplexityMode(EditorComplexityEnum.advanced);
    setComplexityMode(EditorComplexityEnum.advanced);
  }

  return (
    <Provider store={store}>
        { Security.isAccessGranted() ? // this entire if is my-private-customization
            (
                <Page>
                  {/*
                    Using teleportation because if buttons are here then they work properly for entire project
                    but if these are here then cannot place them in desired place in the editor, thus having teleporter
                  */}
                  <EmailComplexityActionsTeleporter.Source>

                    <button className={`easy-email-editor-button complexity-button ${ complexityMode === EditorComplexityEnum.simple ? "complexity-button-active" : ""}`}
                            type="button"
                            onClick={setSimpleComplexityMode}>
                      <div>
                        <div className="iconfont"
                             style={{
                               cursor: 'inherit',
                               pointerEvents: 'auto',
                               color: 'inherit',
                               opacity: '0.75'
                             }}></div>
                        <span> Simple  </span></div>
                    </button>

                    <button className={`easy-email-editor-button complexity-button ${ complexityMode === EditorComplexityEnum.advanced ? "complexity-button-active" : ""}`}
                            style={{
                              marginLeft: "15px"
                            }}
                            type="button"
                            onClick={setAdvancedComplexityMode}>
                      <div>
                        <div className="iconfont"
                             style={{
                               cursor: 'inherit',
                               pointerEvents: 'auto',
                               color: 'inherit',
                               opacity: '0.75'
                             }}></div>
                        <span> Advanced  </span></div>
                    </button>

                  </EmailComplexityActionsTeleporter.Source>

                    <Suspense
                        fallback={
                            <div
                                style={{
                                    width: '100vw',
                                    height: '100vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    width='200px'
                                    src='/images/other/Fj1gmWbF-aY3ZnPyrTrDge6atRnm'
                                    alt=''
                                />
                                <p
                                    style={{
                                        fontSize: 24,
                                        color: 'rgba(0, 0, 0, 0.65)',
                                    }}
                                >
                                    Please wait a moment.
                                </p>
                            </div>
                        }
                    >
                        <Router history={history}>
                            <Switch>
                                {/* start my-private-customization */}
                                { EnvReader.isDev() ? (
                                        <Route path='/' exact component={Home} />
                                    )
                                    : <Route path='/' exact component={NotFound} />
                                }
                                {/* end my-private-customization */}
                                <Route path='/editor' component={Editor} />
                            </Switch>
                        </Router>
                    </Suspense>
                </Page>
            )
            : <h1 style={{textAlign: 'center'}}>403</h1>
        }
    </Provider>
  );
}

export default App;
export {EmailComplexityActionsTeleporter};