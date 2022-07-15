webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ractive__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hasher__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hasher___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hasher__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crossroads__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crossroads___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_crossroads__);




let RactiveRouter = __WEBPACK_IMPORTED_MODULE_0_ractive__["default"].extend({
    template: `<main class="routeContainer"></main>`,
    oninit() {
        //Will hold all constructed crossroads Route objects, for a further use I didn't find yet
        this.routesObjects = [];

        //The current componet the Router displays at a time
        this.currentComponent = undefined;

        //Get user config
        this.routesConfig = this.get('routesConfig');

        //Register for every route, a callback that will display the matching Component
        Object.keys(this.routesConfig).map(routePattern => {

            let routeObject = __WEBPACK_IMPORTED_MODULE_2_crossroads___default.a.addRoute(routePattern, function () {
                let routeConfig = this.routesConfig[routePattern];

                //Build a Route Params Object that will be available in child Component Data
                let routeParams = this.buildRouteParams(routePattern, arguments);

                //Prepare Route callback, if applied
                let callback = routeConfig.callback instanceof Function ? routeConfig.callback : undefined;

                //Create the Route Component or just execute the Route Callback
                if (routeConfig.component) {
                    this.currentComponent = new routeConfig.component({
                        el: this.find('main.routeContainer'),
                        data: {
                            routeParams,
                            parentGlobals: this.get('globals')
                        },
                        oncomplete() {
                            if (callback) callback(routeParams);
                        }
                    });
                } else {
                    if (callback) callback(routeParams);
                }
            }.bind(this));
            this.routesObjects.push(routeObject);
        });

        //Observe Global Data and notify current route Component
        this.observe('globals', function (globals) {
            if (this.currentComponent && this.currentComponent.update) {
                this.currentComponent.update('parentGlobals');
            }
        });

        //Redirect Not found route to 404
        __WEBPACK_IMPORTED_MODULE_2_crossroads___default.a.bypassed.add(function () {
            __WEBPACK_IMPORTED_MODULE_1_hasher___default.a.replaceHash('404');
        });
    },
    onrender() {
        //Hasher init
        let parseHash = function (newHash, oldHash) {
            __WEBPACK_IMPORTED_MODULE_2_crossroads___default.a.parse(newHash);
        };
        __WEBPACK_IMPORTED_MODULE_1_hasher___default.a.initialized.add(parseHash);
        __WEBPACK_IMPORTED_MODULE_1_hasher___default.a.changed.add(parseHash);
        __WEBPACK_IMPORTED_MODULE_1_hasher___default.a.prependHash = '';
        __WEBPACK_IMPORTED_MODULE_1_hasher___default.a.init();

        //Launch home
        if (!location.hash) {
            this.navigateToHome();
        }
    },
    buildRouteParams(routePattern, values) {
        let routeParamNames = __WEBPACK_IMPORTED_MODULE_2_crossroads___default.a.patternLexer.getParamIds(routePattern);
        let result = routeParamNames.reduce((result, field, index) => {
            let value = values[index];
            if (typeof values[index] !== 'object') {
                result[field] = values[index] || undefined;
            } else {
                Object.keys(value).map(key => {
                    result[key] = value[key];
                });
            }
            return result;
        }, {});
        return result;
    },
    navigateToHome() {
        var routePattern = Object.keys(this.routesConfig).find(patten => {
            return this.routesConfig[patten].index;
        });
        if (routePattern) {
            __WEBPACK_IMPORTED_MODULE_1_hasher___default.a.replaceHash(routePattern);
        }
    }
});

//Programatically navigate to a new route
RactiveRouter.go = hash => {
    __WEBPACK_IMPORTED_MODULE_1_hasher___default.a.setHash(hash);
};

//Similar to Router.go(hash), but doesn't create a new record in browser history.
RactiveRouter.replace = hash => {
    __WEBPACK_IMPORTED_MODULE_1_hasher___default.a.replaceHash(hash);
};

/* harmony default export */ __webpack_exports__["a"] = (RactiveRouter);

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ractive__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_ractive_router__ = __webpack_require__(1);




//Root App
new __WEBPACK_IMPORTED_MODULE_0_ractive__["default"]({
    el: '#root',
    data: {
        routesConfig: __WEBPACK_IMPORTED_MODULE_1__routes__["a" /* default */],
        globals: {
            app: 'Demo' //Routes components can access globals data via ractive.get('parentGlobals') or {{parentGlobals}}
        }
    },
    components: {
        Router: __WEBPACK_IMPORTED_MODULE_2__utils_ractive_router__["a" /* default */]
    },
    template: `
            <div class="container hvh-100">
                <Router routesConfig={{routesConfig}} />
            </div>
    `,
    oninit() {
        console.log('App init');
    },
    onrender() {
        console.log('App Render');
    },
    oncomplete() {
        console.log('App Complete');
    }
});

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_lead__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_login__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_overview__ = __webpack_require__(15);




/* harmony default export */ __webpack_exports__["a"] = ({
    /* Home route designed by the index: true attribute */
    '': {
        component: __WEBPACK_IMPORTED_MODULE_1__components_login__["a" /* default */],
        index: true
    },
    'overview': {
        component: __WEBPACK_IMPORTED_MODULE_2__components_overview__["a" /* default */]
    },
    'lead': {
        component: __WEBPACK_IMPORTED_MODULE_0__components_lead__["a" /* default */]
    }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ractive__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_localstorage__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_ractive_router__ = __webpack_require__(1);



const storageName = 'emailData';

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_ractive__["default"].extend({
    template: `
            <div class="row mt-5">
            <div class="col-md-12 d-flex align-items-center justify-content-between">
                <p class="mb-0 ft-20 text-uppercase text-muted">Elapsed Time</p>
                <button on-click="onExit" class="text-uppercase btn btn-secondary rounded-pill">Exit</button>
            </div>
        </div>

        <div class="row mt-5 mb-5">
            <div class="col-md-12 d-flex justify-content-between">
                <button on-click="['onSubmitLead', 'positive_reply']" class="text-uppercase btn btn-dark rounded-pill px-5 py-2">Positive reply</button>
                <button on-click="['onSubmitLead', 'neutral_reply']" class="text-uppercase btn btn-dark rounded-pill px-5 py-2">Neutral reply</button>
                <button on-click="['onSubmitLead', 'not_a_lead']" class="text-uppercase btn btn-dark rounded-pill px-5 py-2">Not a lead</button>
            </div>
        </div>

        <div class="row mt-80">
            <div class="col-md-12">
                <h2 class="text-center text-muted">Email</h2>
            </div>
            <div class="col-md-12">
                <form>
                    <div class="form-group">
                    <input value={{selectedLead.subject}} type="text" class="form-control form-control-lg bg-grey-light" placeholder="Subject">
                    </div>
                    <div class="form-group">
                        <textarea value={{selectedLead.body}} class="form-control bg-grey-light" rows="10" placeholder="Body"></textarea>
                    </div>
                </form>
            </div>
        </div>
    `,
    data: {
        emailData: [],
        selectedLead: null,
        timerIntance: null
    },
    storage: Object(__WEBPACK_IMPORTED_MODULE_1__utils_localstorage__["a" /* default */])(storageName),
    on: {
        onExit() {
            console.log("Exit from lead");
            this.clearTimer();
            __WEBPACK_IMPORTED_MODULE_2__utils_ractive_router__["a" /* default */].go('/overview');
        },
        onSubmitLead(context, status) {
            console.log(status);
            const lead = this.get('selectedLead');

            if (!lead) alert('No lead is selected at a moment');
            const index = lead.index;
            lead.status = status;
            delete lead.index;

            this.storage.update(index, lead);
            this.pickLead();
        }
    },
    oninit() {
        console.log('Lead init');
        const data = this.storage.getAll();
        this.set('emailData', data);
        this.pickLead();
    },
    onteardown() {
        console.log('Lead teardown');
    },
    pickLead() {
        // resetting previous lead
        this.set('selectedLead');
        this.clearTimer();

        const allLeads = this.get('emailData');
        const lead = allLeads.find(lead => lead.status == 'pending');
        const leadIndex = allLeads.indexOf(lead);

        lead.index = leadIndex;
        console.log({ leadIndex, lead });

        if (!lead) alert('No lead is available at the moment');
        this.set('selectedLead', lead);
        const timeout = setTimeout(() => {
            alert("Page will be refreshed because session was expired");
            this.pickLead();
        }, 120000);
        this.set('timerIntance', timeout);
    },
    clearTimer() {
        const isTimerRunning = this.get('timerIntance');
        if (isTimerRunning) {
            clearInterval(isTimerRunning);
            console.log("Timer cleared");
        }
    }
}));

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const localstorage = name => {

    function getAll() {
        const items = JSON.parse(localStorage.getItem(name));
        return items;
    }

    function setAll(items) {
        localStorage.setItem(name, JSON.stringify(items));
        return items;
    }

    function update(index, body) {

        const items = JSON.parse(localStorage.getItem(name));

        // body.id = id;
        // const itemIndex = items.findIndex(e => e.id == id);

        items[index] = body;
        localStorage.setItem(name, JSON.stringify(items));

        return body;
    }

    return {
        getAll,
        update,
        setAll
    };
};

/* harmony default export */ __webpack_exports__["a"] = (localstorage);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ractive__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ractive_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_json__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__user_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__emails_json__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__emails_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__emails_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_localstorage__ = __webpack_require__(11);





console.log(__WEBPACK_IMPORTED_MODULE_3__emails_json___default.a);
const data = JSON.parse(__WEBPACK_IMPORTED_MODULE_2__user_json___default.a).map(item => {
    return {
        // ...item,
        id: Date.now()
    };
});
console.log(data);
localStorage.setItem('userData', JSON.stringify(__WEBPACK_IMPORTED_MODULE_2__user_json___default.a));
localStorage.setItem('emailData', JSON.stringify(__WEBPACK_IMPORTED_MODULE_3__emails_json___default.a));
// var retrievedObject = localStorage.getItem('userData');
// var data = JSON.parse(retrievedObject);
const storageName = 'userData';
// console.log('retrievedObject: ', JSON.parse(retrievedObject));
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_ractive__["default"].extend({
    template: `
        <div class="d-flex hvh-100 align-items-center justify-content-center">
            <div class="col-md-5">
                <form>
                    <div class="form-group">
                    <label for="input-user"><span class="text-muted ft-20">User</span></label>
                    <select value={{selectedUser}} class="form-control form-control-lg">
                    {{#each userData:index}}
                    <option value={{index}}>{{name}}</option>
                   {{/each}}
                    </select>
                    </div>
                    <div class="d-flex justify-content-center mt-4">
                        <div class="wp-80">
                            <button on-click="onSubmit" type="button" class="btn btn-dark btn-lg btn-block rounded-pill">Login</button>
                            <!-- <a href="index.html" class="btn btn-dark btn-lg btn-block rounded-pill">Login</a> -->
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `,
    data: {
        userData: [],
        selectedUser: ""
    },
    storage: Object(__WEBPACK_IMPORTED_MODULE_4__utils_localstorage__["a" /* default */])(storageName),
    on: {
        onSubmit() {
            const selectedUser = this.get('selectedUser');
            const user = this.get('userData');
            user.find(loginUser => {
                if (user.indexOf(loginUser) == selectedUser) {
                    if (loginUser.status == 'active') {
                        alert('Already loggedIn!!');
                    }
                    loginUser.status = 'active';
                    localStorage.setItem('loginUser', JSON.stringify(loginUser));
                }
            });
            localStorage.setItem('userData', JSON.stringify(user));
            console.log(user);
            __WEBPACK_IMPORTED_MODULE_1__utils_ractive_router__["a" /* default */].go('/lead');
        }
    },
    oninit() {
        console.log('Home init');
        const data = this.storage.getAll();
        console.log(data);
        this.set('userData', data);
    },
    onteardown() {
        console.log('Home teardown');
    }
}));

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = [{"name":"User 1","status":"inactive"},{"name":"User 2","status":"inactive"},{"name":"User 3","status":"inactive"},{"name":"User 4","status":"inactive"}]

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = [{"body":"Hi Stephen,\n\n \n\nMany thanks for your email to Lauren below.\n\n \n\nI am now managing Linkedin for 2020 from a B2B perspective and would be interested to know more.\n\nI have some availability next week – does 9.30/10am work for you on Monday?\n\n \n\nBest wishes,\n\nKatie\n\n \n\n \n\nKatie Moulton\n\nCorporate Account Executive\n\n020 3409 6629\n\nBiscuiteers Baking Company, Unit 2, Greenlea Park, Prince Georges Road, Wimbledon, SW19 2JD\n\n \n\nwww.biscuiteers.com \n\nWhy send flowers when you can send Biscuiteers instead?\n\nAll rights reserved. © Biscuiteers.com\n\n \n\nWant one of our lovely catalogues?\n\n ","date":"2020.01.31","email_lead":"lauren@biscuiteers.com","subject":"RE: schedule a call, Lauren","status":"pending"},{"body":"Hi Stephen –\n\n \n\nI would like to use Linked In  to generate more sales and could do a 5 minute phone call.\n\n \n\nTammy     WE ARE HIRING!\n\n \n\nTamara A. Kiesa, Marketing Director & Assistant to Gary A. Grossman, CPA, CFP\n110 West Fayette Street | Suite 900 | Syracuse, New York 13202-1387\n\nP 315.701.6350 | F 315.423.2883 | Email: tkiesa@gsacpas.com | Web: www.gsacpas.com\n\n\n \n\nFIND US ON FACEBOOK | FIND US ON LINKED IN | FIND US ON TWITTER\n\n \n\ncid:image002.jpg@01D270F2.948E3570\n\n \n\n   cid:image009.jpg@01D270F2.397D1160            cid:image011.jpg@01D270F2.948E3570\n\n \n\nConfidentiality Notice:  The information contained in this email transmission is confidential and may be privileged from disclosure.  This email transmission is for the use of the intended recipient only.  If you are not the intended recipient, you are hereby notified that any dissemination, distribution, printing, copying or any other use of this email transmission is strictly prohibited and may constitute a violation of law. If you have received this email transmission and you are not the intended recipient, please notify us immediately by phone or by reply email and delete this email transmission from your system(s) and destroy all copies hereof.  Thank you. ","date":"2020.02.03","email_lead":"tkiesa@gsacpas.com","subject":"RE: schedule a call, Tamara","status":"pending"},{"body":"Hello Nikhil – thank you for reaching out.\n\nAs a first step, please explain how you ‘fund’ future sales.\n\n \n\nThank you.\n\n \n\nScott Macwilliam, MBA\nPresident\n\nElby Mobility\n1 + 905-302-1287\n\nVisit us @ \n\nwww.elbymobility.com and,\n\nhttps://business.elbymobility.com/\n\n\nFollow us @\n\nhttps://www.instagram.com/elbymobility/\n\nhttps://www.facebook.com/ElbyBike/","date":"2020.01.15","email_lead":"scott.macwilliam@elbybike.com","subject":"POC - Nikhil Gokal","status":"pending"},{"body":"Adrian too busy right now, catch up end of March,\n\nthx","date":"2020.01.24","email_lead":"lindaw@parama.ca","subject":"question","status":"pending"},{"body":"Dear Saumil,\n\nI’m copying Jawwad who will be the in charge person for any insurance subject.\n\n \n\n \n\n \n\nBest regards,\n\n \n\nIbrahim Bala’awi\n\nManaging Director\n\n \n\nm\n\n+971 5o 6149641\n\nt\n\n+971 4 457 9119\n\ne\n\nibrahim.balaawi@waseela.com\n\n","date":"2020.01.29","email_lead":"ibrahim.balaawi@waseela.com","subject":"follow up","status":"pending"},{"body":"Thank you Sukhi, we are not interested, please remove my address from your contact list.\n\n \n\nKind regards\n\n \n\nDany","date":"2020.02.07","email_lead":"DanyO@avdynamics.com.au","subject":"previous email","status":"pending"},{"body":"Hi Brian\n\nThis isn’t relevant to our business, we do not generate sales. \n\nNicole\n\nSent from my iPhone","date":"2020.02.03","email_lead":"ng@betterbankside.co.uk","subject":"I'd love your feedback on that meeting, Nicole","status":"pending"},{"body":"Hi Nathan,\n\n \n\nThanks for reaching out.\n\n \n\nHonestly I do not understand the below message. What sort of solutions you are offering and how this will benefit our business?\n\n \n\nRegards,\n\n \n\nMutasem","date":"2020.01.15","email_lead":"mutasem.alkhalili@bakerhughes.com","subject":"EXT: schedule a call, Mutasem","status":"pending"},{"body":"Hi Brian\n\n\nThanks for getting in touch. However, we’re a public sector organisation and as such, don’t sell anything, so the answer to your question is no, we’re not looking to generate more sales.\n\n \n\nKind regards\n\nKatherine\n\n \n\n \n\nKatherine Goodwin\n\nHead of Communications & Marketing\n\nFood Standards Scotland\n\nPilgrim House, Old Ford Road, Aberdeen, AB11 5RL\n\n01224 285120\n\n07780 227431\n\n \n\nkatherine.goodwin@fss.scot\n\nfoodstandards.gov.scot","date":"2020.01.27","email_lead":"Katherine.Goodwin@fss.scot","subject":"question","status":"pending"},{"body":"Hi Daley,\n\n \n\nThanks for the email and I have copied in Martin our Business Development Director at Greyline who is the best person to talk to with regards to your proposal.\n\n \n\n \n\n \n\nKind regards,​\n\nTony Rogers\n\nManaging Director","date":"2020.01.29","email_lead":"trogers@greylineltd.com","subject":"follow-up","status":"pending"},{"body":"Hi Mark\n\nAll of this is under review right now, can I suggest you get back in touch in 4 weeks time and we will see where we have got to and what our plans will be.\n\nThanks\n\nEmma","date":"2020.01.15","email_lead":"emma@chikas.co.uk","subject":"last email","status":"pending"},{"body":"Hi Brian, this isn’t part of my domain but in any event, we are comfortable with regard to our use of LinkedIn at the moment.\n\n \n\nThanks,\n\nSteve.\n\n \n\nStephen Cannon\nHead of Digital Services \n\nT: +44(0) 131 297 2270  M: +44(0) 7879 407544\n\nwww.agenor.co.uk","date":"2020.02.03","email_lead":"steve.cannon@agenor.co.uk","subject":"schedule a call, Steve","status":"pending"},{"body":"Nathan,\n\n \n\nSorry for the delayed response.\n\nYou may contact Tom McAllister, who is the Director for Training globally.\n\n \n\nTom.McAllister@nov.com\n\n \n\n \n\n \n\nRegards,\n\n \n\nSujith Mohan | Director of Service, MENA & Asia, Marine & Construction\n\nNOV Rig Technologies\n\nAftermarket Operations\n\nM +971-50-538 08 63","date":"2020.01.21","email_lead":"Sujith.Mohan@nov.com","subject":"5 minute call","status":"pending"},{"body":"Ivy,\n\n \n\nThanks so much for your email.  Currently, CBIS is not in need of a video production service.  However, we do have a full-suite of offerings to help get JLB Media in front of the right people in the association space.\n\n \n\nI’ve copied my colleague Marlayna, who can assist you in getting access to the tool that’ll get you to the decision makers who might be interested in your powerful video production service.\n\n \n\nAs well, we host a dozen events throughout the year, a good chunk of them with focus to our technology partners.  Perhaps it’d make sense to have JLB present here for branding as well.\n\n \n\nLet us know if we can help with any of the above and we’ll go from there!\n\n \n\nSHARONPARE\n\nBusiness Development Executive, Industry Partners\n\nwww.associationtrends.com\n\n1560 Wilson Blvd #825 | Rosslyn, VA 22209\n\nDirect | 240-235-0272\n\nFind me on LinkedIn!","date":"2020.01.29","email_lead":"spare@columbiabooks.com","subject":"re: question","status":"pending"},{"body":"Hi Adrian,\n\n \n\nThanks for reaching out. Sure, always nice to have a chat and see if there is anything that might help.\n\nHow about giving me a call at 3pm?\n\n \n\nThanks\n\nAlex\n\n \n\nAlex McCloy\n\nBusiness Development Manager\n\n \n\nMobile: +44 (0)7447 740 591\n\n \n\nProvek - enabling change\nTel: 01635 279868 | Fax: 01635 524620 | Web: www.provek.co.uk\nAssessment Centre / Training and Development / Consultancy\n\nProvek provides unique assessment-led programme and project management solutions","date":"2020.01.20","email_lead":"alex.mccloy@provek.co.uk","subject":"Hi Alex","status":"pending"},{"body":"Hi,\n\n \n\nSend me a time suggestion.\n\n \n\nBest regards\n\n/ Jonathan\n\n \n\nJonathan Wadström\n\n+46 73-660 69 02\n\nwww.zcooly.com","date":"2020.01.31","email_lead":"jonathan@zcooly.com","subject":"schedule a call, Jonathan","status":"pending"},{"body":"Hi Stephen\n\n \n\nThanks for your email. Unfortunately this is not something we’re looking to do either now or in the future.\n\n \n\nKind regards\n\n \n\n \n\nKimberley Hamilton-Young\n\nHead of Marketing & Planning\n\n \n\nTel: +44 (0)20 7096 1960\n\nMob: +44 (0) 7930 506678\n\n \n\nInogesis\n\nSuite 316 | Linen Hall | 162-168 Regent Street | London | W1B 5TD","date":"2020.02.10","email_lead":"Kimberley@inogesis.com","subject":"schedule a call, Kimberley","status":"pending"},{"body":"Hi Stephen,\n\n \n\nThanks for your email. This doesn’t really fit with our profile I’m afraid as we distribute via the Wholesale channel.\n\n \n\nWith regards\n\n \n\n \n\nStuart Eglin\nSales Director\nstuart.eglin@cromptonlamps.com\nwww.cromptonlamps.com","date":"2020.01.29","email_lead":"stuart.eglin@cromptonlamps.com","subject":"Hi Stuart","status":"pending"},{"body":"Hi Stephen,\n\nThank you for your email.\n\nAt present we primarily use LinkedIn for recruitment purposes - not to generate sales.\n\nIf this were to change in the future I’ll be in touch.\n\nKind Regards,\n\nTish ","date":"2020.02.03","email_lead":"Tish.Jayanetti@postalmuseum.org","subject":"schedule a call, Tish","status":"pending"},{"body":"Thanks Stephen, this is not relevant for us. \n\nAll the best.\n\n-Patrik","date":"2020.02.04","email_lead":"patrik.korhonen@dingle.fi","subject":"call on Thursday?","status":"pending"}]

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ractive__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ractive_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_localstorage__ = __webpack_require__(11);



var user = localStorage.getItem('loginUser');
var data1 = JSON.parse(user);
const storageName = 'emailData';

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_ractive__["default"].extend({
    template: `
            <div class="row mt-5">
            <div class="col-md-12 d-flex align-items-center justify-content-between">
                <button on-click="resetApplication" class="text-uppercase btn btn-danger rounded-pill">Reset Applications</button>
                <h2 class="mb-0 text-uppercase text-muted">Overview Page</h2>
                <button on-click="onBack" class="text-uppercase btn btn-secondary rounded-pill">Back</button>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-md-12">
            <h4 class="text-muted">Positive replies: {{countPositiveReply}}</h4>
            <h4 class="text-muted">Neutral replies: {{countNeutralReply}}</h4>
            <h4 class="text-muted">Not a lead: {{countNotALead}}</h4>
            </div>
        </div>

        <div class="row mt-80">
       
            <div class="col-md-12">
                <h2 class="text-center text-muted">All Leads</h2>
            </div>
            <div class="col-md-12">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Proceed By</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>wasiqnaqi@gmail.com</td>
                    <td>Subject 1</td>
                    <td>Wasiq Naqi</td>
                    <td>
                    <span class="badge badge-light">Pending</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob@yahoo.com</td>
                    <td>Subject 2</td>
                    <td>Wasiq Naqi</td>
                    <td>
                    <span class="badge badge-success">Positive reply</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>ali@gmail.com</td>
                    <td>Needing a notebook</td>
                    <td>Wasiq Naqi</td>
                    <td>
                    <span class="badge badge-primary">Neutral reply</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>saboor.saleem@gmail.com</td>
                    <td>Needing a notebook too</td>
                    <td>Wasiq Naqi</td>
                    <td>
                    <span class="badge badge-secondary">Not a lead</span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            <div class="col-md-12 mb-2">
            <div class="border rounded p-3">
                <div class="d-flex align-items-center justify-content-between">
                <p><b>Email:</b> wasiq.naqi@gmail.com</p>
                <p><b>Processed By:</b> Wasiq Naqi</p>
                <div>
                    <b>Status:</b> <span class="badge badge-light">Pending</span>
                </div>
                </div>
                <div>
                <div class="form-group">
                    <div class="form-group">
                    <input type="text" class="form-control bg-grey-light" placeholder="Subject">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control bg-grey-light" rows="4" placeholder="Body"></textarea>
                    </div>
                </div>
                </div>
            </div>
            </div>
            {{#each emailData}}
            <div class="col-md-12 mb-2">
                <div class="border rounded p-3">
                    <div class="d-flex align-items-center justify-content-between">
                    <p><b>Email:</b> {{.email_lead}}</p>
                    <p><b>Processed By:</b> Ali Naseer</p>
                    <div>
                        <b>Status:</b> 
                       {{#if .status == 'pending'}}<span class="badge badge-light">Pending</span>{{/if}}
                       {{#if .status == 'positive_reply'}}<span class="badge badge-success">Positive reply</span>{{/if}}
                       {{#if .status == 'neutral_reply'}}<span class="badge badge-primary">Neutral reply</span>{{/if}}
                       {{#if .status == 'not_a_lead'}}<span class="badge badge-secondary">Not a lead</span>{{/if}}
                    </div>
                    </div>
                    <div>
                    <div class="form-group">
                        <div class="form-group">
                        <input value={{.subject}} disabled type="text" class="form-control bg-grey-light" placeholder="Subject">
                        </div>
                        <div class="form-group">
                            <textarea value={{.body}} disabled class="form-control bg-grey-light" rows="4" placeholder="Body"></textarea>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {{/each}}


        </div>
    `,
    data: {
        emailData: [],
        processedBy: "",
        countPositiveReply: 0,
        countNeutralReply: 0,
        countNotALead: 0
    },
    on: {
        onBack() {
            console.log("Back");
            __WEBPACK_IMPORTED_MODULE_1__utils_ractive_router__["a" /* default */].go('/');
        },
        resetApplication() {
            const currentData = this.get('emailData');
            const newData = currentData.map(item => {
                return {
                    item,
                    status: 'pending'
                };
            });

            this.storage.setAll(newData);
            this.set('emailData', newData);
        }
    },
    storage: Object(__WEBPACK_IMPORTED_MODULE_2__utils_localstorage__["a" /* default */])(storageName),
    oninit() {
        console.log('Overview init');
        const data = this.storage.getAll();
        this.set('emailData', data);
        this.set('processedBy', data1.name);
    },
    observe: {
        // Observe changes on the array
        'emailData'() {

            let status = {};
            // console.log('array observer', arguments)
            const newData = this.get('emailData');
            for (let item of newData) {
                if (status.hasOwnProperty(item.status)) {
                    status[item.status] += 1;
                } else {
                    status[item.status] = 1;
                }
            }

            // Update variables
            this.set('countPositiveReply', status['positive_reply']);
            this.set('countNeutralReply', status['neutral_reply']);
            this.set('countNotALead', status['not_a_lead']);
        }
    },
    onteardown() {
        console.log('Overview teardown');
    }
}));

/***/ })
],[7]);