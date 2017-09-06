webpackJsonp([ 1 ], {
    /***/
    "2Ib2"(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.fetchUsersIfNeeded = t.fetchUsers = t.API_URL = t.USERS_SUCCESS = t.USERS_FAILURE = t.USERS_REQUESTING = t.USERS_INVALID = void 0;
        var n = r("2uFj"), u = (t.USERS_INVALID = "USERS_INVALID", t.USERS_REQUESTING = "USERS_REQUESTING"), a = t.USERS_FAILURE = "USERS_FAILURE", l = t.USERS_SUCCESS = "USERS_SUCCESS", d = t.API_URL = "https://jsonplaceholder.typicode.com/users", o = t.fetchUsers = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : d;
            return function(r) {
                return r({
                    type: u
                }), e.get(t).then(function(e) {
                    return r({
                        type: l,
                        data: e.data
                    });
                }).catch(function(e) {
                    return r({
                        type: a,
                        err: e.message
                    });
                });
            };
        }, f = function(e) {
            return !!n.inDevelopment || e.home.readyStatus !== l;
        };
        t.fetchUsersIfNeeded = function() {
            return function(e, t, r) {
                return f(t()) ? e(o(r)) : null;
            };
        };
    },
    /***/
    "2uFj"(e, t, r) {
        "use strict";
        /* WEBPACK VAR INJECTION */
        (function(t) {
            e.exports = {
                host: t.env.NODE_HOST || "localhost",
                port: t.env.PORT,
                nodeEnv: "production",
                inDevelopment: !1,
                inProduction: !0,
                app: {
                    htmlAttributes: {
                        lang: "en"
                    },
                    title: "Webpack React Boilerplater Test",
                    titleTemplate: "Webpack React Boilerplater Test - %s",
                    meta: [ {
                        name: "description",
                        content: "Webpack React Boilerplater. Test"
                    } ]
                }
            };
        }).call(t, r("W2nU"));
    },
    /***/
    "4GjL"(e, t) {
        e.exports = "/static/images/logo.jpg";
    },
    /***/
    "67t3"(e, t) {},
    /***/
    "6ppN"(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = n(r("Dd8w")), a = n(r("U7vG")), l = r("F8kA"), d = n(r("PIAa")), o = n(r("M4fF")), f = n(r("2uFj")), i = n(r("T1vP"));
        // Configuration
        // Libs
        t.default = function() {
            // Use it when sub routes are added to any route it'll work
            var e = function(e) {
                return a.default.createElement(l.Route, {
                    key: o.default.uniqueId(),
                    exact: e.exact || !1,
                    path: e.path,
                    render(t) {
                        // Pass the sub-routes down to keep nesting
                        return a.default.createElement(e.component, (0, u.default)({}, t, {
                            routes: e.routes || null
                        }));
                    }
                });
            };
            return a.default.createElement("div", null, a.default.createElement(d.default, f.default.app), a.default.createElement("div", null, a.default.createElement("img", {
                src: r("4GjL"),
                alt: "Logo",
                role: "presentation"
            }), a.default.createElement("h1", null, f.default.app.title), a.default.createElement("p", null, "This has HMR"), a.default.createElement("img", {
                src: r("K7yD"),
                alt: "Placeholder"
            })), a.default.createElement("hr", null), a.default.createElement(l.Switch, null, i.default.map(function(t) {
                return e(t);
            })));
        };
    },
    /***/
    C2Tt(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(r("U7vG")), u = function(e) {
            var t = e.info;
            return n.default.createElement("div", null, n.default.createElement("h4", null, "User Card"), n.default.createElement("ul", null, n.default.createElement("li", null, "Name: ", t.name), n.default.createElement("li", null, "Phone: ", t.phone), n.default.createElement("li", null, "Email: ", t.email), n.default.createElement("li", null, "Website: ", t.website)));
        };
        // Libs
        u.defaultProps = {
            info: {
                name: "",
                phone: "",
                email: "",
                website: ""
            }
        }, t.default = u;
    },
    /***/
    "E+7y"(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.fetchUserIfNeeded = t.fetchUser = t.API_URL = t.USER_SUCCESS = t.USER_FAILURE = t.USER_REQUESTING = void 0;
        var n = r("2uFj"), u = t.USER_REQUESTING = "USER_REQUESTING", a = t.USER_FAILURE = "USER_FAILURE", l = t.USER_SUCCESS = "USER_SUCCESS", d = t.API_URL = "https://jsonplaceholder.typicode.com/users", o = t.fetchUser = function(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : d;
            return function(n) {
                return n({
                    type: u,
                    userId: e
                }), t.get(r + "/" + e).then(function(t) {
                    return n({
                        type: l,
                        userId: e,
                        data: t.data
                    });
                }).catch(function(t) {
                    return n({
                        type: a,
                        userId: e,
                        err: t.message
                    });
                });
            };
        }, f = function(e, t) {
            if (n.inDevelopment) return !0;
            var r = e.userInfo[t];
            return !r || r.readyStatus !== l;
        };
        t.fetchUserIfNeeded = function(e) {
            return function(t, r, n) {
                return f(r(), e) ? t(o(e, n)) : null;
            };
        };
    },
    /***/
    K7yD(e, t) {
        e.exports = "/static/images/image-placeholder.jpg";
    },
    /***/
    "O/lJ"(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(r("M4fF")), u = r("2Ib2"), a = {
            readyStatus: u.USERS_INVALID,
            err: null,
            list: []
        };
        t.default = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a, t = arguments[1];
            switch (t.type) {
              case u.USERS_REQUESTING:
                return n.default.assign({}, e, {
                    readyStatus: u.USERS_REQUESTING
                });

              case u.USERS_FAILURE:
                return n.default.assign({}, e, {
                    readyStatus: u.USERS_FAILURE,
                    err: t.err
                });

              case u.USERS_SUCCESS:
                return n.default.assign({}, e, {
                    readyStatus: u.USERS_SUCCESS,
                    list: t.data
                });

              default:
                return e;
            }
        };
    },
    /***/
    T1vP(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = n(r("//Fk")), a = r("2Ib2"), l = r("E+7y"), d = n(r("Xr+z")), o = n(r("dDlN")), f = n(r("hhE+"));
        t.default = [ {
            path: "/",
            exact: !0,
            component: d.default,
            // Add your route here
            loadData(e) {
                return u.default.all([ e((0, a.fetchUsersIfNeeded)()) ]);
            }
        }, {
            path: "/UserInfo/:id",
            component: o.default,
            loadData(e, t) {
                return u.default.all([ e((0, l.fetchUserIfNeeded)(t.id)) ]);
            }
        }, {
            path: "*",
            component: f.default
        } ];
    },
    /***/
    "Xr+z"(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Home = void 0;
        var u = n(r("Zrlr")), a = n(r("zwoO")), l = n(r("Pf15")), d = r("U7vG"), o = n(d), f = r("RH2O"), i = n(r("PIAa")), s = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t.default = e, t;
        }(r("2Ib2")), c = n(r("ah7/")), E = t.Home = function(e) {
            function t() {
                var r, n, l;
                (0, u.default)(this, t);
                for (var d = arguments.length, f = Array(d), i = 0; i < d; i++) f[i] = arguments[i];
                return r = n = (0, a.default)(this, e.call.apply(e, [ this ].concat(f))), n.renderUserList = function() {
                    var e = n.props.home;
                    return e.readyStatus && e.readyStatus !== s.USERS_INVALID && e.readyStatus !== s.USERS_REQUESTING ? e.readyStatus === s.USERS_FAILURE ? o.default.createElement("p", null, "Oops, Failed to load list!") : o.default.createElement(c.default, {
                        list: e.list
                    }) : o.default.createElement("p", null, "Loading...");
                }, l = r, (0, a.default)(n, l);
            }
            return (0, l.default)(t, e), t.prototype.componentDidMount = function() {
                this.props.fetchUsersIfNeeded();
            }, t.prototype.render = function() {
                return o.default.createElement("div", null, o.default.createElement(i.default, {
                    title: "Home"
                }), this.renderUserList());
            }, t;
        }(d.PureComponent), p = (0, f.connect)(function(e) {
            return {
                home: e.home
            };
        }, function(e) {
            return {
                fetchUsersIfNeeded() {
                    return e(s.fetchUsersIfNeeded());
                }
            };
        });
        t.default = p(E);
    },
    /***/
    "ah7/"(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(r("U7vG")), u = r("F8kA"), a = function(e) {
            var t = e.list;
            return n.default.createElement("div", null, n.default.createElement("h4", null, "User List"), n.default.createElement("ul", null, t.map(function(e) {
                return n.default.createElement("li", {
                    key: e.id
                }, n.default.createElement(u.Link, {
                    to: "/UserInfo/" + e.id
                }, e.name));
            })));
        };
        a.defaultProps = {
            list: {
                id: "",
                name: ""
            }
        }, t.default = a;
    },
    /***/
    d6J6(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(r("M4fF")), u = r("E+7y");
        t.default = function() {
            var e, t, r, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, l = arguments[1];
            switch (l.type) {
              case u.USER_REQUESTING:
                return n.default.assign({}, a, (e = {}, e[l.userId] = {
                    readyStatus: u.USER_REQUESTING
                }, e));

              case u.USER_FAILURE:
                return n.default.assign({}, a, (t = {}, t[l.userId] = {
                    readyStatus: u.USER_FAILURE,
                    err: l.err
                }, t));

              case u.USER_SUCCESS:
                return n.default.assign({}, a, (r = {}, r[l.userId] = {
                    readyStatus: u.USER_SUCCESS,
                    info: l.data
                }, r));

              default:
                return a;
            }
        };
    },
    /***/
    dDlN(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.UserInfo = void 0;
        var u = n(r("Zrlr")), a = n(r("zwoO")), l = n(r("Pf15")), d = r("U7vG"), o = n(d), f = r("RH2O"), i = n(r("PIAa")), s = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t.default = e, t;
        }(r("E+7y")), c = n(r("C2Tt")), E = t.UserInfo = function(e) {
            function t() {
                var r, n, l;
                (0, u.default)(this, t);
                for (var d = arguments.length, f = Array(d), i = 0; i < d; i++) f[i] = arguments[i];
                return r = n = (0, a.default)(this, e.call.apply(e, [ this ].concat(f))), n.renderUserCard = function() {
                    var e = n.props, t = e.userInfo[e.match.params.id];
                    return t && t.readyStatus !== s.USER_REQUESTING ? t.readyStatus === s.USER_FAILURE ? o.default.createElement("p", null, "Oops, Failed to load info!") : o.default.createElement(c.default, {
                        info: t.info
                    }) : o.default.createElement("p", null, "Loading...");
                }, l = r, (0, a.default)(n, l);
            }
            return (0, l.default)(t, e), t.prototype.componentDidMount = function() {
                var e = this.props;
                (0, e.fetchUserIfNeeded)(e.match.params.id);
            }, t.prototype.render = function() {
                return o.default.createElement("div", null, o.default.createElement(i.default, {
                    title: "User Info"
                }), this.renderUserCard());
            }, t;
        }(d.PureComponent), p = (0, f.connect)(function(e) {
            return {
                userInfo: e.userInfo
            };
        }, function(e) {
            return {
                fetchUserIfNeeded(t) {
                    return e(s.fetchUserIfNeeded(t));
                }
            };
        });
        t.default = p(E);
    },
    /***/
    fm7g(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = r("2KeS"), a = r("MT/C"), l = n(r("O/lJ")), d = n(r("d6J6"));
        t.default = (0, u.combineReducers)({
            home: l.default,
            userInfo: d.default,
            router: a.routerReducer
        });
    },
    /***/
    "hhE+"(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = n(r("U7vG")), a = n(r("PIAa"));
        t.default = function() {
            return u.default.createElement("div", null, u.default.createElement(a.default, {
                title: "Oops"
            }), u.default.createElement("p", null, "Oops, Page was not found!"));
        };
    },
    /***/
    lVK7(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        n(r("YQ7m"));
        var u = n(r("U7vG")), a = r("O27J"), l = r("rGbO"), d = r("RH2O"), o = n(r("ciQf")), f = r("MT/C"), i = n(r("wtEF"));
        r("67t3");
        // Get initial state from server-side rendering
        var s = window.__INITIAL_STATE__, c = (0, o.default)(), E = (0, i.default)(c, s), p = document.getElementById("react-view");
        // Favicon
        r("qW6h");
        // Styles
        var S = function() {
            var e = r("6ppN").default;
            (0, a.render)(u.default.createElement(l.AppContainer, null, u.default.createElement(d.Provider, {
                store: E
            }, u.default.createElement(f.ConnectedRouter, {
                history: c
            }, u.default.createElement(e, null)))), p);
        };
        S();
    },
    /***/
    qW6h(e, t) {
        e.exports = "/static/images/favicon.ico";
    },
    /***/
    wtEF(e, t, r) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = n(r("pFYg")), a = r("2uFj"), l = r("MT/C"), d = r("2KeS"), o = n(r("4ufr")), f = n(r("mtWM")), i = n(r("fm7g"));
        // Configuration
        t.default = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = [ o.default.withExtraArgument(f.default), (0, 
            l.routerMiddleware)(e) ], n = [ d.applyMiddleware.apply(void 0, r), a.inDevelopment && "object" === ("undefined" == typeof window ? "undefined" : (0, 
            u.default)(window)) && void 0 !== window.devToolsExtension ? window.devToolsExtension() : function(e) {
                return e;
            } ], s = (0, d.createStore)(i.default, t, d.compose.apply(void 0, n));
            return s;
        };
    }
}, [ "lVK7" ]);
//# sourceMappingURL=main.js.map