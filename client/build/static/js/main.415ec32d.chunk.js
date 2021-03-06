(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
  [0],
  {
    188: function (e, a, t) {
      e.exports = t.p + "static/media/bkg-private.72043118.svg";
    },
    272: function (e, a, t) {
      e.exports = t.p + "static/media/bkg-alt.5c918cda.jpg";
    },
    275: function (e, a, t) {
      e.exports = t.p + "static/media/googleLogo.8f343c26.svg";
    },
    294: function (e, a, t) {
      e.exports = t(440);
    },
    366: function (e, a, t) {
      e.exports = t.p + "static/media/WelcomePage.bbfb3c11.png";
    },
    367: function (e, a, t) {
      e.exports = t.p + "static/media/EditPage.056bf09a.gif";
    },
    368: function (e, a, t) {
      e.exports = t.p + "static/media/AccountEditPage.4d227e0b.gif";
    },
    440: function (e, a, t) {
      "use strict";
      t.r(a);
      var n = t(0),
        r = t.n(n),
        l = t(13),
        o = t.n(l),
        i = t(501),
        c = t(502),
        s = t(278),
        m = Object(s.a)({
          palette: {
            primary: { main: "#0f2840" },
            secondary: { main: "#648818" },
            tertiary: { main: "#012611" },
            neutral: { main: "#D9D7D7" },
            text: { primary: "#000000", secondary: "#FFFFFF" },
          },
          typography: {
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: 12,
            h1: { fontSize: 40 },
            h2: { fontSize: 30 },
            h3: { fontSize: 20 },
            h4: { fontWeight: 500, fontSize: 16 },
          },
          overrides: {
            MuiCssBaseline: { "@global": { body: { overflowX: "hidden" } } },
          },
        }),
        u = t(78),
        d = t(31),
        p = t(136),
        f = t(194),
        h = t.n(f),
        g = function (e) {
          var a, t;
          (a = "token"),
            (t = e),
            "undefined" !== window && h.a.set(a, t, { expires: 1 }),
            (function (e, a) {
              "undefined" !== window &&
                localStorage.setItem(e, JSON.stringify(a));
            })("token", e);
        },
        E = function () {
          if (
            "undefined" !== window &&
            (function (e) {
              if ("undefined" !== window) return h.a.get(e);
            })("token")
          )
            return !!localStorage.getItem("token");
        },
        b = function (e) {
          var a;
          (a = "token"),
            "undefined" !== window && h.a.remove(a, { expires: 1 }),
            (function (e) {
              "undefined" !== window && localStorage.removeItem(e);
            })("token"),
            e();
        };
      var y = function (e) {
          var a = e.component,
            t = Object(p.a)(e, ["component"]);
          return r.a.createElement(
            d.b,
            Object.assign({}, t, {
              render: function (e) {
                return E()
                  ? r.a.createElement(a, e)
                  : r.a.createElement(d.a, { to: "/home/login" });
              },
            })
          );
        },
        v = t(474),
        N = t(497),
        x = t(498),
        w = t(106),
        S = t(479),
        C = t(11),
        k = t(10),
        j = t.n(k);
      j.a.defaults.baseURL = window.location.origin;
      var O = function (e) {
          return j.a.post("/api/user/signup", {
            firstName: e.firstName,
            lastName: e.lastName,
            email: e.email,
            password: e.password,
          });
        },
        F = function (e) {
          return j.a.post("/api/user/login", {
            email: e.email,
            password: e.password,
          });
        },
        P = function (e) {
          return j.a.post("api/user/googleLogin", { idToken: e });
        },
        B = function (e, a) {
          return j.a.post("api/user/facebooklogin", {
            userID: e,
            accessToken: a,
          });
        },
        I = function () {
          return j.a.get("/api/user/userInfo", {
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        A = function () {
          return j.a.get("/api/profile/", {
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        T = function () {
          return j.a.get("/api/profile/profile-pic", {
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        D = function () {
          return j.a.get("/api/profile/education", {
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        z = function (e) {
          return j.a.post(
            "/api/profile/education",
            {
              edu_type: e.edu_type,
              schoolName: e.schoolName,
              unicourseName: e.unicourseName,
              monthStart: e.monthStart,
              yearStart: e.yearStart,
              monthEnd: e.monthEnd,
              yearEnd: e.yearEnd,
              graduated: e.graduated,
            },
            {
              headers: {
                Authorization:
                  "Bearer: " + JSON.parse(localStorage.getItem("token")),
              },
            }
          );
        },
        M = function (e, a) {
          return j.a.put(
            "/api/profile/education/".concat(a),
            {
              edu_type: e.edu_type,
              schoolName: e.schoolName,
              unicourseName: e.unicourseName,
              unimajorName: e.unimajorName,
              monthStart: e.monthStart,
              yearStart: e.yearStart,
              monthEnd: e.monthEnd,
              yearEnd: e.yearEnd,
              graduated: e.graduated,
            },
            {
              headers: {
                Authorization:
                  "Bearer: " + JSON.parse(localStorage.getItem("token")),
              },
            }
          );
        },
        W = function (e) {
          return j.a.delete("/api/profile/education/".concat(e), {
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        L = function () {
          return j.a.get("api/files/", {
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        R = function () {
          return j.a.get("api/blog", {
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        J = function () {
          return j.a.get("api/profile/aboutMe", {
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        q = function (e) {
          return j.a.put("api/profile/aboutMe", {
            aboutMe: e.aboutMe,
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        V = function (e) {
          return j.a.put(
            "api/user/userInfo",
            {
              firstName: e.firstName,
              lastName: e.lastName,
              mobileNumber: e.mobileNumber,
              birthDate: e.birthDate,
            },
            {
              headers: {
                Authorization:
                  "Bearer: " + JSON.parse(localStorage.getItem("token")),
              },
            }
          );
        },
        G = function (e) {
          return j.a.put(
            "api/user/update/email",
            { email: e.email },
            {
              headers: {
                Authorization:
                  "Bearer: " + JSON.parse(localStorage.getItem("token")),
              },
            }
          );
        },
        U = function (e) {
          return j.a.put(
            "api/user/update/password",
            { oldPassword: e.oldPassword, newPassword: e.newPassword },
            {
              headers: {
                Authorization:
                  "Bearer: " + JSON.parse(localStorage.getItem("token")),
              },
            }
          );
        },
        K = function (e) {
          return j.a.post(
            "api/experience",
            {
              type: e.type,
              organization: e.organization,
              role: e.role,
              employeeStatus: e.employeeStatus,
              yearStart: e.yearStart,
              yearEnd: e.yearEnd,
              monthStart: e.monthStart,
              monthEnd: e.monthEnd,
              description: e.description,
            },
            {
              headers: {
                Authorization:
                  "Bearer: " + JSON.parse(localStorage.getItem("token")),
              },
            }
          );
        },
        _ = function () {
          return j.a.get("api/experience", {
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        Y = function (e) {
          return j.a.delete("api/experience/delete/".concat(e), {
            headers: {
              Authorization:
                "Bearer: " + JSON.parse(localStorage.getItem("token")),
            },
          });
        },
        $ = function (e, a) {
          return j.a.put(
            "api/experience/edit/".concat(a),
            {
              type: e.type,
              organization: e.organization,
              role: e.role,
              employeeStatus: e.employeeStatus,
              yearStart: e.yearStart,
              yearEnd: e.yearEnd,
              monthStart: e.monthStart,
              monthEnd: e.monthEnd,
              description: e.description,
            },
            {
              headers: {
                Authorization:
                  "Bearer: " + JSON.parse(localStorage.getItem("token")),
              },
            }
          );
        },
        Z = function (e) {
          return j.a.get("api/view/profile/".concat(e), {});
        },
        H = function (e) {
          return j.a.get("api/view/experience/".concat(e), {});
        },
        X = t(488),
        Q = t(442),
        ee = t(477),
        ae = t(443),
        te = t(495),
        ne = t(496),
        re = t(130),
        le = t.n(re),
        oe = t(271),
        ie = t.n(oe),
        ce = t(132),
        se = t.n(ce),
        me = t(187),
        ue = t.n(me),
        de = t(514),
        pe = t(504),
        fe = t(56),
        he = t.n(fe),
        ge = t(480),
        Ee = t(513),
        be = t(482),
        ye = t(483),
        ve = t(15),
        Ne = t(505),
        xe = t(478),
        we = Object(v.a)(function (e) {
          return {
            form: {
              flexGrow: 1,
              padding: "0 5% 0 5%",
              "& .MuiFormLabel-root": { color: e.palette.text.primary },
            },
            divider: {
              width: "100%",
              backgroundColor: e.palette.secondary.main,
            },
            addButton: { marginTop: e.spacing(3) },
            buttonContainer: {
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            },
            addButtonContainer: { display: "flex", justifyContent: "center" },
          };
        }),
        Se = function (e) {
          var a = e.type,
            t = e.label,
            n = e.index,
            l = e.record;
          return r.a.createElement(
            ve.a,
            { name: "reflections[".concat(n, "].").concat(a) },
            function (e) {
              var a = e.field,
                n = e.meta;
              return r.a.createElement(Ne.a, {
                color: "primary",
                variant: "outlined",
                margin: "dense",
                fullWidth: !0,
                multiline: !0,
                rows: 4,
                label: t,
                defaultValue: l,
                helperText: n.touched && n.error ? n.error : " ",
                onChange: a.onChange(a.name),
                onBlur: a.onBlur(a.name),
                error: n.touched && Boolean(n.error),
              });
            }
          );
        },
        Ce = function (e) {
          var a = e.handleClose,
            t = e.records,
            n = we();
          return r.a.createElement(
            ve.c,
            { initialValues: { reflections: t }, onSubmit: function (e, a) {} },
            function (e) {
              return r.a.createElement(
                "form",
                { classes: n.form, onSubmit: e.handleSubmit },
                r.a.createElement(xe.a, { className: n.divider }),
                r.a.createElement(ve.b, {
                  name: "Bio",
                  render: function (e) {
                    return r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(Se, { type: "Content", rowsMax: 4 })
                    );
                  },
                }),
                r.a.createElement(
                  "div",
                  { className: n.buttonContainer },
                  r.a.createElement(
                    S.a,
                    {
                      className: n.button,
                      onClick: function () {
                        return a();
                      },
                      color: "primary",
                    },
                    r.a.createElement(w.a, null, "Cancel")
                  ),
                  r.a.createElement(
                    S.a,
                    {
                      type: "Submit",
                      className: n.button,
                      disabled: !e.isValid,
                      color: "primary",
                    },
                    r.a.createElement(w.a, null, "Update")
                  )
                )
              );
            }
          );
        },
        ke = Object(v.a)(function (e) {
          return {
            container: {
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
            },
            paper: {
              position: "absolute",
              width: "40%",
              backgroundColor: e.palette.neutral.main,
              border: "2px solid #000",
              boxShadow: e.shadows[5],
              padding: e.spacing(2, 4, 3),
            },
          };
        }),
        je = function (e) {
          var a = e.records,
            t = e.setRecords,
            n = ke(),
            l = r.a.useState(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = function () {
              T().then(function (e) {
                var a = e.data;
                t(a), c(!1);
              });
            };
          return r.a.createElement(
            "div",
            { className: n.container },
            r.a.createElement(
              ge.a,
              {
                onClick: function () {
                  c(!0);
                },
              },
              r.a.createElement(he.a, null)
            ),
            r.a.createElement(
              Ee.a,
              {
                fullWidth: !0,
                maxWidth: "md",
                open: i,
                onClose: s,
                "aria-labelledby": "form-dialog-title",
              },
              r.a.createElement(
                be.a,
                { disableTypography: !0 },
                r.a.createElement(w.a, { variant: "h2" }, "Edit Bio")
              ),
              r.a.createElement(
                ye.a,
                null,
                r.a.createElement(Ce, { records: a, handleClose: s })
              )
            )
          );
        },
        Oe = Object(v.a)(function (e) {
          return {
            characterCard: {
              margin: "0 0 1% 1%",
              width: "100%",
              background: e.palette.primary.light,
              padding: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            },
            profilePicture: { height: "5em", width: "5em", cursor: "pointer" },
            bio: { marginLeft: "5%", flexGrow: 1, color: "white !important " },
          };
        }),
        Fe = function (e) {
          var a = e.user,
            t = Oe(),
            l = Object(n.useState)(a),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1];
          return r.a.createElement(
            Q.a,
            { className: t.characterCard },
            r.a.createElement(
              pe.a,
              {
                name: "profile-pic",
                accept: "image/*",
                showUploadList: !1,
                action: "/api/upload/profile-pic",
                headers: {
                  Authorization:
                    "Bearer: " + JSON.parse(localStorage.getItem("token")),
                },
              },
              r.a.createElement(de.a, { className: t.profilePicture })
            ),
            r.a.createElement(
              "div",
              { className: t.bio },
              r.a.createElement(
                w.a,
                { variant: "h2" },
                a.firstName,
                " ",
                a.lastName
              ),
              r.a.createElement(
                w.a,
                null,
                r.a.createElement(w.a, null, " Add Bio ")
              ),
              r.a.createElement(w.a, null, a.bio),
              r.a.createElement(je, { records: i, setRecords: c })
            )
          );
        },
        Pe = t(489),
        Be = t(490),
        Ie = t(491),
        Ae = t(492),
        Te = t(506),
        De = t(484),
        ze = t(485),
        Me = t(510),
        We = t(486),
        Le = t(487),
        Re = t(210),
        Je = t.n(Re),
        qe = t(182),
        Ve = t.n(qe),
        Ge = t(183),
        Ue = t.n(Ge),
        Ke = t(16),
        _e = Ke.c().shape({
          schools: Ke.a().of(
            Ke.c().shape({
              schoolName: Ke.d()
                .test(
                  "alphabets",
                  "Name must only contain alphabets",
                  function (e) {
                    return /^[A-Za-z ]+$/.test(e);
                  }
                )
                .required("Required"),
              unicourseName: Ke.d().test(
                "alphabets",
                "Name must only contain alphabets",
                function (e) {
                  return /^[A-Za-z ]+$/.test(e);
                }
              ),
              monthEnd: Ke.b().test("continuity", "Invalid month", function (
                e
              ) {
                return (
                  !this.parent.yearStart ||
                  this.parent.yearStart !== this.parent.yearEnd ||
                  this.parent.monthStart < e
                );
              }),
            })
          ),
        }),
        Ye = Object(v.a)(function (e) {
          return {
            schoolEntry: { display: "flex", paddingLeft: "5%" },
            form: {
              flexGrow: 1,
              padding: "0 5% 0 5%",
              "& .MuiFormLabel-root": { color: e.palette.text.primary },
            },
            periodInfo: { display: "flex" },
            divider: {
              width: "100%",
              backgroundColor: e.palette.tertiary.main,
              marginBottom: e.spacing(3),
            },
            addButton: { marginTop: e.spacing(3) },
            buttonContainer: {
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            },
            addButtonContainer: { display: "flex", justifyContent: "center" },
            graduatedButton: { marginBottom: e.spacing(3) },
          };
        }),
        $e = new Date().getFullYear(),
        Ze = function (e) {
          var a = e.type,
            t = e.label,
            n = e.index,
            l = e.record;
          return r.a.createElement(
            ve.a,
            { name: "schools[".concat(n, "].").concat(a) },
            function (e) {
              var a = e.field,
                n = e.meta;
              return r.a.createElement(Ne.a, {
                color: "primary",
                variant: "outlined",
                margin: "dense",
                fullWidth: !0,
                label: t,
                defaultValue: l,
                helperText: n.touched && n.error ? n.error : " ",
                onChange: a.onChange(a.name),
                onBlur: a.onBlur(a.name),
                error: n.touched && Boolean(n.error),
              });
            }
          );
        },
        He = function (e) {
          var a = e.record,
            t = e.index;
          return r.a.createElement(
            ve.a,
            { name: "schools[".concat(t, "].edu_type") },
            function (e) {
              var t = e.field,
                n = e.meta;
              return r.a.createElement(
                Ne.a,
                {
                  fullWidth: !0,
                  select: !0,
                  variant: "outlined",
                  margin: "dense",
                  label: "Education Type",
                  value: a,
                  helperText: n.touched && n.error ? n.error : " ",
                  onChange: t.onChange(t.name),
                  error: n.touched && Boolean(n.error),
                },
                r.a.createElement(De.a, { value: "Highschool" }, "HighSchool"),
                r.a.createElement(De.a, { value: "University" }, "University")
              );
            }
          );
        },
        Xe = function (e) {
          var a = e.record,
            t = e.index,
            n = e.milestone,
            l = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
          return r.a.createElement(
            ve.a,
            { name: "schools[".concat(t, "].").concat(n) },
            function (e) {
              var t = e.field,
                n = e.meta;
              return r.a.createElement(
                Ne.a,
                {
                  fullWidth: !0,
                  select: !0,
                  variant: "outlined",
                  margin: "dense",
                  label: "Month",
                  value: a,
                  helperText: n.error ? n.error : " ",
                  onChange: t.onChange(t.name),
                  error: Boolean(n.error),
                },
                l.map(function (e, a) {
                  return r.a.createElement(De.a, { key: a, value: a + 1 }, e);
                })
              );
            }
          );
        },
        Qe = function (e) {
          var a = e.record,
            t = e.index,
            n = e.milestone,
            l = Array.from(new Array(20), function (e, a) {
              return $e - a;
            });
          if ("yearEnd" === n) {
            var o = a.yearStart;
            l = Array.from(new Array(20), function (e, a) {
              return o + a;
            });
          }
          return r.a.createElement(
            ve.a,
            { name: "schools[".concat(t, "].").concat(n) },
            function (e) {
              var t = e.field;
              e.meta;
              return r.a.createElement(
                Ne.a,
                {
                  fullWidth: !0,
                  select: !0,
                  variant: "outlined",
                  margin: "dense",
                  label: "Year",
                  value: "yearStart" === n ? a.yearStart : a.yearEnd,
                  onChange: t.onChange(t.name),
                },
                l.map(function (e, a) {
                  return r.a.createElement(De.a, { key: a, value: e }, e);
                })
              );
            }
          );
        },
        ea = function (e) {
          var a = e.index,
            t = Ye();
          return r.a.createElement(
            ve.a,
            { name: "schools[".concat(a, "].graduated") },
            function (e) {
              var a = e.field;
              e.meta;
              return r.a.createElement(ze.a, {
                control: r.a.createElement(
                  Me.a,
                  Object.assign(
                    {
                      checked: a.value,
                      icon: r.a.createElement(Je.a, { color: "disabled" }),
                      checkedIcon: r.a.createElement(Je.a, {
                        color: "secondary",
                      }),
                      size: "medium",
                    },
                    a
                  )
                ),
                label: "Graduated",
                className: t.graduatedButton,
              });
            }
          );
        },
        aa = function (e) {
          var a = e.handleClose,
            t = e.records,
            n = Ye();
          return r.a.createElement(
            ve.c,
            {
              initialValues: { schools: t },
              onSubmit: function (e, t) {
                e.schools.forEach(function (e) {
                  e._id
                    ? M(e, e._id)
                        .then(function (e) {
                          a();
                        })
                        .catch(function (e) {
                          console.log(e.response.data), t.setSubmitting(!1);
                        })
                    : z(e)
                        .then(function (e) {
                          a();
                        })
                        .catch(function (e) {
                          console.log(e.response.data), t.setSubmitting(!1);
                        });
                });
              },
              validationSchema: _e,
            },
            function (e) {
              return r.a.createElement(
                r.a.Fragment,
                null,
                r.a.createElement(
                  ye.a,
                  { dividers: !0 },
                  r.a.createElement(
                    "form",
                    { classes: n.form, onSubmit: e.handleSubmit },
                    r.a.createElement(ve.b, {
                      name: "schools",
                      render: function (a) {
                        return r.a.createElement(
                          r.a.Fragment,
                          null,
                          e.values.schools.map(function (e, t) {
                            return r.a.createElement(
                              r.a.Fragment,
                              { key: t },
                              r.a.createElement(
                                "div",
                                { className: n.schoolEntry },
                                r.a.createElement(le.a, {
                                  color: "primary",
                                  style: { fontSize: 40 },
                                }),
                                r.a.createElement(
                                  "div",
                                  { className: n.form },
                                  r.a.createElement(He, {
                                    record: e.edu_type,
                                    index: t,
                                  }),
                                  r.a.createElement(Ze, {
                                    type: "schoolName",
                                    label: "School Name",
                                    index: t,
                                    record: e.schoolName,
                                  }),
                                  "University" === e.edu_type
                                    ? r.a.createElement(Ze, {
                                        type: "unicourseName",
                                        label: "Course Name",
                                        index: t,
                                        record: e.unicourseName,
                                      })
                                    : "",
                                  r.a.createElement(
                                    "div",
                                    { className: n.periodInfo },
                                    r.a.createElement(
                                      We.a,
                                      { container: !0, spacing: 2 },
                                      r.a.createElement(
                                        We.a,
                                        { item: !0, xs: 12, sm: 2 },
                                        r.a.createElement(w.a, null, "From: ")
                                      ),
                                      r.a.createElement(
                                        We.a,
                                        { item: !0, xs: 12, sm: 5 },
                                        r.a.createElement(Xe, {
                                          record: e.monthStart,
                                          index: t,
                                          milestone: "monthStart",
                                        })
                                      ),
                                      r.a.createElement(
                                        We.a,
                                        { item: !0, xs: 12, sm: 5 },
                                        r.a.createElement(Qe, {
                                          record: e,
                                          index: t,
                                          milestone: "yearStart",
                                        })
                                      )
                                    )
                                  ),
                                  r.a.createElement(
                                    "div",
                                    { className: n.periodInfo },
                                    r.a.createElement(
                                      We.a,
                                      { container: !0, spacing: 2 },
                                      r.a.createElement(
                                        We.a,
                                        { item: !0, xs: 12, sm: 2 },
                                        r.a.createElement(w.a, null, "To: ")
                                      ),
                                      r.a.createElement(
                                        We.a,
                                        { item: !0, xs: 12, sm: 5 },
                                        r.a.createElement(Xe, {
                                          record: e.monthEnd,
                                          index: t,
                                          milestone: "monthEnd",
                                        })
                                      ),
                                      r.a.createElement(
                                        We.a,
                                        { item: !0, xs: 12, sm: 5 },
                                        r.a.createElement(Qe, {
                                          record: e,
                                          index: t,
                                          milestone: "yearEnd",
                                        })
                                      )
                                    )
                                  ),
                                  r.a.createElement(
                                    "div",
                                    { className: n.periodInfo },
                                    r.a.createElement(
                                      We.a,
                                      { container: !0, spacing: 2 },
                                      r.a.createElement(
                                        We.a,
                                        {
                                          item: !0,
                                          xs: 12,
                                          sm: 2,
                                          align: "center",
                                        },
                                        r.a.createElement(ea, { index: t })
                                      )
                                    )
                                  )
                                ),
                                r.a.createElement(
                                  "div",
                                  null,
                                  r.a.createElement(
                                    ge.a,
                                    {
                                      onClick: function () {
                                        W(e._id)
                                          .then(function (e) {
                                            a.remove(t);
                                          })
                                          .catch(function (e) {
                                            console.log(e.response.data);
                                          });
                                      },
                                    },
                                    r.a.createElement(Ve.a, {
                                      style: { fontSize: 30 },
                                    })
                                  )
                                )
                              ),
                              r.a.createElement(xe.a, { className: n.divider })
                            );
                          }),
                          r.a.createElement(
                            "div",
                            { className: n.addButtonContainer },
                            r.a.createElement(
                              ge.a,
                              {
                                className: n.button,
                                onClick: function () {
                                  return a.push({
                                    edu_type: "",
                                    schoolName: "",
                                    unicourseName: "",
                                    unimajorname: "",
                                    monthStart: 1,
                                    yearStart: $e,
                                    monthEnd: 12,
                                    yearEnd: $e,
                                    graduated: !1,
                                  });
                                },
                                color: "primary",
                              },
                              r.a.createElement(Ue.a, {
                                style: { fontSize: 30 },
                              })
                            )
                          )
                        );
                      },
                    })
                  )
                ),
                r.a.createElement(
                  Le.a,
                  null,
                  r.a.createElement(
                    S.a,
                    {
                      className: n.button,
                      onClick: function () {
                        return a();
                      },
                      color: "primary",
                    },
                    r.a.createElement(w.a, null, "Cancel")
                  ),
                  r.a.createElement(
                    "div",
                    { className: n.buttonWrapper },
                    r.a.createElement(
                      S.a,
                      {
                        type: "Submit",
                        className: n.submit,
                        onClick: function () {
                          return e.handleSubmit();
                        },
                        disabled: !e.isValid || e.isSubmitting,
                        color: "primary",
                      },
                      r.a.createElement(w.a, null, "Update")
                    ),
                    e.isSubmitting &&
                      r.a.createElement(X.a, {
                        size: 24,
                        className: n.buttonProgress,
                      })
                  )
                )
              );
            }
          );
        },
        ta = Object(v.a)(function (e) {
          return {
            container: {
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
            },
            dialog: {
              "& .MuiDialogTitle-root": {
                background: "linear-gradient(175deg, white 75%, ".concat(
                  e.palette.secondary.main,
                  " 25%)"
                ),
              },
              "& .MuiDialogActions-root": {
                background: "linear-gradient(175deg, ".concat(
                  e.palette.primary.main,
                  " 55%,  white 20%)"
                ),
              },
            },
            paper: {
              position: "absolute",
              width: "40%",
              backgroundColor: e.palette.neutral.main,
              border: "2px solid #000",
              boxShadow: e.shadows[5],
              padding: e.spacing(2, 4, 3),
            },
          };
        }),
        na = function (e) {
          var a = e.records,
            t = e.setRecords,
            n = ta(),
            l = r.a.useState(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = function () {
              D().then(function (e) {
                var a = e.data;
                t(a), c(!1);
              });
            };
          return r.a.createElement(
            "div",
            { className: n.container },
            r.a.createElement(
              ge.a,
              {
                onClick: function () {
                  c(!0);
                },
              },
              r.a.createElement(he.a, null)
            ),
            r.a.createElement(
              Ee.a,
              {
                fullWidth: !0,
                maxWidth: "md",
                scroll: "paper",
                open: i,
                onClose: s,
                className: n.dialog,
              },
              r.a.createElement(
                Te.a,
                { boxShadow: 2 },
                r.a.createElement(
                  be.a,
                  { disableTypography: !0 },
                  r.a.createElement(
                    w.a,
                    { variant: "h2" },
                    "Edit Education Information"
                  )
                )
              ),
              r.a.createElement(aa, { records: a, handleClose: s })
            )
          );
        },
        ra = Object(v.a)(function (e) {
          return {
            card: {
              margin: "0 0 1% 1%",
              width: "100%",
              padding: e.spacing(5),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            title: { width: "100%" },
            tableContainer: {
              width: "90%",
              paddingLeft: e.spacing(1),
              paddingRight: e.spacing(3),
            },
            table: { "& .MuiTableCell-body": {} },
            period: { width: "30%", verticalAlign: "top" },
            education: { verticalAlign: "top" },
          };
        }),
        la = {
          1: "Jan",
          2: "Feb",
          3: "Mar",
          4: "Apr",
          5: "May",
          6: "Jun",
          7: "Jul",
          8: "Aug",
          9: "Sep",
          10: "Oct",
          11: "Nov",
          12: "Dec",
        },
        oa = function (e) {
          var a = e.education,
            t = ra(),
            l = Object(n.useState)(a),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1];
          return r.a.createElement(
            Q.a,
            { className: t.card },
            r.a.createElement(
              w.a,
              { className: t.title, variant: "h2" },
              "Education",
              " "
            ),
            r.a.createElement(
              "div",
              { className: t.tableContainer },
              (function (e) {
                return Array.isArray(e) && e.length
                  ? r.a.createElement(
                      Pe.a,
                      { className: t.table },
                      r.a.createElement(
                        Be.a,
                        null,
                        e.map(function (e, a) {
                          return r.a.createElement(
                            Ie.a,
                            { key: a, className: t.table },
                            r.a.createElement(
                              Ae.a,
                              { className: t.period },
                              r.a.createElement(
                                w.a,
                                null,
                                la[e.monthStart],
                                ", ",
                                e.yearStart,
                                " -",
                                la[e.monthEnd],
                                ", ",
                                e.yearEnd
                              )
                            ),
                            r.a.createElement(
                              Ae.a,
                              { className: t.education },
                              r.a.createElement(
                                w.a,
                                { variant: "h4" },
                                e.schoolName
                              ),
                              "University" === e.edu_type
                                ? r.a.createElement(
                                    w.a,
                                    null,
                                    e.unicourseName,
                                    " ",
                                    e.unimajorName
                                  )
                                : ""
                            )
                          );
                        })
                      )
                    )
                  : r.a.createElement(w.a, null, " Add your education!");
              })(i)
            ),
            r.a.createElement(na, { records: i, setRecords: c })
          );
        },
        ia = t(259),
        ca = t.n(ia),
        sa = Ke.c().shape({
          experiences: Ke.a().of(
            Ke.c().shape({
              monthEnd: Ke.b().test("continuity", "Invalid month", function (
                e
              ) {
                return (
                  !this.parent.yearStart ||
                  this.parent.yearStart !== this.parent.yearEnd ||
                  this.parent.monthStart < e
                );
              }),
            })
          ),
        }),
        ma = Object(v.a)(function (e) {
          return {
            expEntry: { display: "flex", paddingLeft: "5%" },
            form: {
              flexGrow: 1,
              padding: "0 5% 0 5%",
              "& .MuiFormLabel-root": { color: e.palette.text.primary },
            },
            periodInfo: { display: "flex" },
            divider: {
              width: "100%",
              backgroundColor: e.palette.tertiary.main,
              marginBottom: e.spacing(3),
            },
            addButton: { marginTop: e.spacing(3) },
            addButtonContainer: { display: "flex", justifyContent: "center" },
            buttonWrapper: { margin: e.spacing(1), position: "relative" },
            buttonProgress: {
              color: e.palette.secondary.main,
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: -12,
              marginLeft: -12,
            },
          };
        }),
        ua = new Date().getFullYear(),
        da = function (e) {
          var a = e.type,
            t = e.label,
            n = e.index,
            l = e.record,
            o = Object(p.a)(e, ["type", "label", "index", "record"]);
          return r.a.createElement(
            ve.a,
            { name: "experiences[".concat(n, "].").concat(a) },
            function (e) {
              var a = e.field,
                n = e.meta;
              return r.a.createElement(
                Ne.a,
                Object.assign(
                  {
                    color: "primary",
                    variant: "outlined",
                    margin: "dense",
                    fullWidth: !0,
                    label: t,
                    defaultValue: l,
                    helperText: n.touched && n.error ? n.error : " ",
                    onChange: a.onChange(a.name),
                    onBlur: a.onBlur(a.name),
                    error: n.touched && Boolean(n.error),
                  },
                  o
                )
              );
            }
          );
        },
        pa = function (e) {
          var a = e.record,
            t = e.index;
          return r.a.createElement(
            ve.a,
            { name: "experiences[".concat(t, "].employeeStatus") },
            function (e) {
              var t = e.field,
                n = e.meta;
              return r.a.createElement(
                Ne.a,
                {
                  fullWidth: !0,
                  select: !0,
                  variant: "outlined",
                  margin: "dense",
                  label: "Status",
                  value: a,
                  helperText: n.touched && n.error ? n.error : " ",
                  onChange: t.onChange(t.name),
                  error: n.touched && Boolean(n.error),
                },
                r.a.createElement(De.a, { value: "Full Time" }, "Full Time"),
                r.a.createElement(De.a, { value: "Part Time" }, "Part Time"),
                r.a.createElement(De.a, { value: "Casual" }, "Casual")
              );
            }
          );
        },
        fa = function (e) {
          var a = e.record,
            t = e.index,
            n = e.milestone,
            l = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
          return r.a.createElement(
            ve.a,
            { name: "experiences[".concat(t, "].").concat(n) },
            function (e) {
              var t = e.field,
                n = e.meta;
              return r.a.createElement(
                Ne.a,
                {
                  fullWidth: !0,
                  select: !0,
                  variant: "outlined",
                  margin: "dense",
                  label: "Month",
                  value: a,
                  helperText: n.error ? n.error : " ",
                  onChange: t.onChange(t.name),
                  error: Boolean(n.error),
                },
                l.map(function (e, a) {
                  return r.a.createElement(De.a, { key: a, value: a + 1 }, e);
                })
              );
            }
          );
        },
        ha = function (e) {
          var a = e.record,
            t = e.index,
            n = e.milestone,
            l = Array.from(new Array(20), function (e, a) {
              return ua - a;
            });
          if ("yearEnd" === n) {
            var o = a.yearStart;
            l = Array.from(new Array(20), function (e, a) {
              return o + a;
            });
          }
          return r.a.createElement(
            ve.a,
            { name: "experiences[".concat(t, "].").concat(n) },
            function (e) {
              var t = e.field;
              e.meta;
              return r.a.createElement(
                Ne.a,
                {
                  fullWidth: !0,
                  select: !0,
                  variant: "outlined",
                  margin: "dense",
                  label: "Year",
                  value: "yearStart" === n ? a.yearStart : a.yearEnd,
                  onChange: t.onChange(t.name),
                },
                l.map(function (e, a) {
                  return r.a.createElement(De.a, { key: a, value: e }, e);
                })
              );
            }
          );
        },
        ga = function (e) {
          var a = e.handleClose,
            t = e.records,
            n = e.open,
            l = e.expType,
            o = ma(),
            i = r.a.useRef(null);
          return (
            r.a.useEffect(
              function () {
                if (n) {
                  var e = i.current;
                  null !== e && e.focus();
                }
              },
              [n]
            ),
            r.a.createElement(
              ve.c,
              {
                initialValues: { experiences: t },
                onSubmit: function (e, t) {
                  e.experiences.forEach(function (e) {
                    e._id
                      ? $(e, e._id)
                          .then(function (e) {
                            a();
                          })
                          .catch(function (e) {
                            t.setSubmitting(!1);
                          })
                      : K(e)
                          .then(function (e) {
                            a();
                          })
                          .catch(function (e) {
                            t.setSubmitting(!1);
                          });
                  });
                },
                validationSchema: sa,
              },
              function (e) {
                return r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(
                    ye.a,
                    { dividers: !0 },
                    r.a.createElement(
                      "form",
                      { classes: o.form, onSubmit: e.handleSubmit },
                      r.a.createElement(ve.b, {
                        name: "experiences",
                        render: function (a) {
                          return r.a.createElement(
                            r.a.Fragment,
                            null,
                            e.values.experiences.map(function (e, t) {
                              return r.a.createElement(
                                r.a.Fragment,
                                { key: t },
                                r.a.createElement(
                                  "div",
                                  { className: o.expEntry },
                                  r.a.createElement(ca.a, {
                                    color: "primary",
                                    style: { fontSize: 40 },
                                  }),
                                  r.a.createElement(
                                    "div",
                                    { className: o.form },
                                    r.a.createElement(da, {
                                      type: "organization",
                                      label: "Organization",
                                      index: t,
                                      record: e.organization,
                                      required: !0,
                                    }),
                                    r.a.createElement(da, {
                                      type: "role",
                                      label: "Role",
                                      index: t,
                                      record: e.role,
                                      required: !0,
                                    }),
                                    r.a.createElement(
                                      "div",
                                      { className: o.periodInfo },
                                      r.a.createElement(
                                        We.a,
                                        { container: !0, spacing: 2 },
                                        r.a.createElement(
                                          We.a,
                                          { item: !0, xs: 12, sm: 2 },
                                          r.a.createElement(w.a, null, "From: ")
                                        ),
                                        r.a.createElement(
                                          We.a,
                                          { item: !0, xs: 12, sm: 5 },
                                          r.a.createElement(fa, {
                                            record: e.monthStart,
                                            index: t,
                                            milestone: "monthStart",
                                          })
                                        ),
                                        r.a.createElement(
                                          We.a,
                                          { item: !0, xs: 12, sm: 5 },
                                          r.a.createElement(ha, {
                                            record: e,
                                            index: t,
                                            milestone: "yearStart",
                                          })
                                        )
                                      )
                                    ),
                                    r.a.createElement(
                                      "div",
                                      { className: o.periodInfo },
                                      r.a.createElement(
                                        We.a,
                                        { container: !0, spacing: 2 },
                                        r.a.createElement(
                                          We.a,
                                          { item: !0, xs: 12, sm: 2 },
                                          r.a.createElement(w.a, null, "To: ")
                                        ),
                                        r.a.createElement(
                                          We.a,
                                          { item: !0, xs: 12, sm: 5 },
                                          r.a.createElement(fa, {
                                            record: e.monthEnd,
                                            index: t,
                                            milestone: "monthEnd",
                                          })
                                        ),
                                        r.a.createElement(
                                          We.a,
                                          { item: !0, xs: 12, sm: 5 },
                                          r.a.createElement(ha, {
                                            record: e,
                                            index: t,
                                            milestone: "yearEnd",
                                          })
                                        )
                                      )
                                    ),
                                    r.a.createElement(
                                      "div",
                                      { className: o.periodInfo },
                                      r.a.createElement(pa, {
                                        record: e.employeeStatus,
                                        index: t,
                                      })
                                    ),
                                    r.a.createElement(da, {
                                      type: "description",
                                      label: "Describe your experience",
                                      index: t,
                                      record: e.description,
                                      multiline: !0,
                                      rows: 8,
                                    })
                                  ),
                                  r.a.createElement(
                                    "div",
                                    null,
                                    r.a.createElement(
                                      ge.a,
                                      {
                                        onClick: function () {
                                          a.remove(t),
                                            Y(e._id).catch(function (e) {
                                              console.log(e.response.data);
                                            });
                                        },
                                      },
                                      r.a.createElement(Ve.a, {
                                        style: { fontSize: 30 },
                                      })
                                    )
                                  )
                                ),
                                r.a.createElement(xe.a, {
                                  className: o.divider,
                                })
                              );
                            }),
                            r.a.createElement(
                              "div",
                              { className: o.addButtonContainer },
                              r.a.createElement(
                                ge.a,
                                {
                                  className: o.button,
                                  onClick: function () {
                                    return a.push({
                                      type: l,
                                      organization: "",
                                      role: "",
                                      employeeStatus: "",
                                      monthStart: 1,
                                      yearStart: ua,
                                      monthEnd: 12,
                                      yearEnd: ua,
                                      description: "",
                                    });
                                  },
                                  color: "primary",
                                },
                                r.a.createElement(Ue.a, {
                                  style: { fontSize: 30 },
                                })
                              )
                            )
                          );
                        },
                      })
                    )
                  ),
                  r.a.createElement(
                    Te.a,
                    { boxShadow: 2 },
                    r.a.createElement(
                      Le.a,
                      null,
                      r.a.createElement(
                        S.a,
                        {
                          className: o.button,
                          onClick: function () {
                            return a();
                          },
                        },
                        r.a.createElement(w.a, null, "Cancel")
                      ),
                      r.a.createElement(
                        "div",
                        null,
                        r.a.createElement(
                          S.a,
                          {
                            type: "Submit",
                            className: o.button,
                            onClick: function () {
                              return e.handleSubmit();
                            },
                            disabled: !e.isValid,
                          },
                          r.a.createElement(w.a, null, "Update")
                        ),
                        e.isSubmitting &&
                          r.a.createElement(X.a, {
                            size: 24,
                            className: o.buttonProgress,
                          })
                      )
                    )
                  )
                );
              }
            )
          );
        },
        Ea = Object(v.a)(function (e) {
          return {
            container: {
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
            },
            panelContainer: {
              flexGrow: 1,
              backgroundColor: e.palette.background.paper,
              display: "flex",
              height: 224,
            },
            paper: {
              position: "absolute",
              width: "40%",
              backgroundColor: e.palette.neutral.main,
              border: "2px solid #000",
              boxShadow: e.shadows[5],
              padding: e.spacing(2, 4, 3),
            },
            dialog: {
              "& .MuiDialogTitle-root": {
                background: "linear-gradient(175deg, white 75%, ".concat(
                  e.palette.secondary.main,
                  " 25%)"
                ),
              },
              "& .MuiDialogActions-root": {
                background: "linear-gradient(175deg, ".concat(
                  e.palette.primary.main,
                  " 55%,  white 20%)"
                ),
              },
            },
            subTitle: {
              width: "100%",
              marginBottom: e.spacing(3),
              display: "flex",
              flexDirection: "row",
              "&::after": {
                content: '""',
                flex: "1 1",
                borderColor: "#D9D7D7",
                borderBottom: "1px solid",
                margin: "auto",
              },
            },
          };
        }),
        ba = function (e) {
          var a,
            t = e.records,
            n = e.setRecords,
            l = e.type,
            o = Ea(),
            i = r.a.useState(!1),
            c = Object(C.a)(i, 2),
            s = c[0],
            m = c[1],
            u = function () {
              _().then(function (e) {
                var a = e.data;
                console.log(a), n(a), m(!1);
              });
            };
          return r.a.createElement(
            "div",
            { className: o.container },
            r.a.createElement(
              ge.a,
              {
                onClick: function () {
                  m(!0);
                },
              },
              r.a.createElement(he.a, null)
            ),
            r.a.createElement(
              Ee.a,
              {
                fullWidth: !0,
                maxWidth: "md",
                scroll: "paper",
                open: s,
                onClose: u,
                className: o.dialog,
              },
              r.a.createElement(
                Te.a,
                { boxShadow: 2 },
                r.a.createElement(
                  be.a,
                  { disableTypography: !0 },
                  r.a.createElement(
                    w.a,
                    { variant: "h2" },
                    "Edit Your ",
                    (a = l).charAt(0).toUpperCase() + a.slice(1),
                    " Experience"
                  )
                )
              ),
              r.a.createElement(ga, {
                records: t,
                handleClose: u,
                open: s,
                expType: l,
              })
            )
          );
        },
        ya = Object(v.a)(function (e) {
          return {
            card: {
              margin: "0 0 1% 1%",
              width: "100%",
              padding: e.spacing(5),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            workSection: {
              margin: e.spacing(2),
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            },
            title: {
              width: "100%",
              marginBottom: e.spacing(3),
              display: "flex",
              flexDirection: "row",
            },
            subTitle: {
              width: "100%",
              marginBottom: e.spacing(3),
              display: "flex",
              flexDirection: "row",
              "&::after": {
                content: '""',
                flex: "1 1",
                borderColor: "#D9D7D7",
                borderBottom: "1px solid",
                margin: "auto",
              },
            },
            tableContainer: {
              width: "90%",
              paddingLeft: e.spacing(1),
              paddingRight: e.spacing(3),
            },
            table: {
              "& .MuiTable-root": {
                borderBottom: "1px solid ".concat(e.palette.primary.light),
              },
            },
            addExperience: {
              display: "flex",
              justifyContent: "center",
              background: e.palette.neutral.light,
              borderRadius: e.spacing(2),
            },
            period: { width: "30%", verticalAlign: "top" },
            experience: { verticalAlign: "top" },
            organisation: { width: "100%" },
            role: { color: e.palette.primary.light },
            description: { marginTop: e.spacing(1) },
          };
        }),
        va = {
          1: "Jan",
          2: "Feb",
          3: "Mar",
          4: "Apr",
          5: "May",
          6: "Jun",
          7: "Jul",
          8: "Aug",
          9: "Sep",
          10: "Oct",
          11: "Nov",
          12: "Dec",
        },
        Na = function (e) {
          var a = e.experience,
            t = ya(),
            l = Object(n.useState)(a),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = function (e) {
              return Array.isArray(e) && e.length
                ? r.a.createElement(
                    Pe.a,
                    { className: t.table },
                    r.a.createElement(
                      Be.a,
                      null,
                      e.map(function (e, a) {
                        return r.a.createElement(
                          Ie.a,
                          { key: a, className: t.table },
                          r.a.createElement(
                            Ae.a,
                            { className: t.period },
                            r.a.createElement(
                              w.a,
                              null,
                              va[e.monthStart],
                              ", ",
                              e.yearStart,
                              " -",
                              va[e.monthEnd],
                              ", ",
                              e.yearEnd
                            )
                          ),
                          r.a.createElement(
                            Ae.a,
                            { className: t.experience },
                            r.a.createElement(
                              w.a,
                              { className: t.organisation, variant: "h3" },
                              e.organization
                            ),
                            r.a.createElement(
                              w.a,
                              { className: t.role },
                              e.role,
                              " ",
                              ", ".concat(e.employeeStatus)
                            ),
                            r.a.createElement(
                              w.a,
                              { className: t.description },
                              e.description
                            )
                          )
                        );
                      })
                    )
                  )
                : r.a.createElement(
                    w.a,
                    { variant: "h3", className: t.addExperience },
                    " ",
                    "Display Your Experience here!"
                  );
            };
          return r.a.createElement(
            Q.a,
            { className: t.card },
            r.a.createElement(
              w.a,
              { className: t.title, variant: "h2" },
              "Experience",
              " "
            ),
            r.a.createElement(
              "div",
              { className: t.workSection },
              r.a.createElement(
                w.a,
                { className: t.subTitle, variant: "h3" },
                "Professional Work"
              ),
              r.a.createElement(
                "div",
                { className: t.tableContainer },
                s(i.employment)
              ),
              r.a.createElement(ba, {
                type: "employment",
                records: i.employment,
                setRecords: c,
              })
            ),
            r.a.createElement(
              "div",
              { className: t.workSection },
              r.a.createElement(
                w.a,
                { className: t.subTitle, variant: "h3" },
                "Volunteer Work"
              ),
              r.a.createElement(
                "div",
                { className: t.tableContainer },
                s(i.volunteering)
              ),
              r.a.createElement(ba, {
                type: "volunteering",
                records: i.volunteering,
                setRecords: c,
              })
            ),
            r.a.createElement(
              "div",
              { className: t.workSection },
              r.a.createElement(
                w.a,
                { className: t.subTitle, variant: "h3" },
                "Extracurricular Work"
              ),
              r.a.createElement(
                "div",
                { className: t.tableContainer },
                s(i.extracurricular)
              ),
              r.a.createElement(ba, {
                type: "extracurricular",
                records: i.extracurricular,
                setRecords: c,
              })
            )
          );
        },
        xa = t(515),
        wa = Object(v.a)(function (e) {
          return {
            card: {
              margin: "0 0 1% 1%",
              width: "100%",
              height: "20%",
              padding: "5%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            title: { width: "100%" },
            skillsContainer: {
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              "& > *": { margin: e.spacing(0.5) },
            },
          };
        }),
        Sa = ["primary", "secondary"],
        Ca = function (e) {
          var a = e.skills,
            t = wa();
          return r.a.createElement(
            Q.a,
            { className: t.card },
            r.a.createElement(
              w.a,
              { className: t.title, variant: "h2" },
              "What I'm Good At"
            ),
            (function (e) {
              return Array.isArray(e) && e.length
                ? r.a.createElement(
                    "div",
                    {
                      className: t.skillsContainer,
                      style: { height: 10 * e.length },
                    },
                    e.map(function (e, a) {
                      return r.a.createElement(xa.a, {
                        key: a,
                        label: e,
                        color: Sa[Math.floor(Math.random() * Sa.length)],
                      });
                    })
                  )
                : r.a.createElement(w.a, null, " Add Some of your skills!");
            })(a)
          );
        },
        ka = Object(v.a)(function (e) {
          return {
            form: {
              flexGrow: 1,
              padding: "0 5% 0 5%",
              "& .MuiFormLabel-root": { color: e.palette.text.primary },
            },
            divider: {
              width: "100%",
              backgroundColor: e.palette.secondary.main,
            },
            addButton: { marginTop: e.spacing(3) },
            buttonContainer: {
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            },
            addButtonContainer: { display: "flex", justifyContent: "center" },
          };
        }),
        ja = function (e) {
          var a = e.type,
            t = e.label,
            n = e.index,
            l = e.record;
          return r.a.createElement(
            ve.a,
            { name: "reflections[".concat(n, "].").concat(a) },
            function (e) {
              var a = e.field,
                n = e.meta;
              return r.a.createElement(Ne.a, {
                color: "primary",
                variant: "outlined",
                margin: "dense",
                fullWidth: !0,
                label: t,
                defaultValue: l,
                helperText: n.touched && n.error ? n.error : " ",
                onChange: a.onChange(a.name),
                onBlur: a.onBlur(a.name),
                error: n.touched && Boolean(n.error),
              });
            }
          );
        },
        Oa = function (e) {
          var a = e.type,
            t = e.label,
            n = e.index,
            l = e.record;
          return r.a.createElement(
            ve.a,
            { name: "reflections[".concat(n, "].").concat(a) },
            function (e) {
              var a = e.field,
                n = e.meta;
              return r.a.createElement(Ne.a, {
                color: "primary",
                variant: "outlined",
                margin: "dense",
                fullWidth: !0,
                multiline: !0,
                rows: 4,
                label: t,
                defaultValue: l,
                helperText: n.touched && n.error ? n.error : " ",
                onChange: a.onChange(a.name),
                onBlur: a.onBlur(a.name),
                error: n.touched && Boolean(n.error),
              });
            }
          );
        },
        Fa = function (e) {
          var a = e.handleClose,
            t = e.records,
            n = ka();
          return r.a.createElement(
            ve.c,
            { initialValues: { reflections: t }, onSubmit: function (e, a) {} },
            function (e) {
              return r.a.createElement(
                "form",
                { classes: n.form, onSubmit: e.handleSubmit },
                r.a.createElement(xe.a, { className: n.divider }),
                r.a.createElement(ve.b, {
                  name: "reflections",
                  render: function (e) {
                    return r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(w.a, null, "Title"),
                      r.a.createElement(ja, { type: "Title" }),
                      r.a.createElement(w.a, null, "Reflection"),
                      r.a.createElement(Oa, { type: "Content", rowsMax: 4 })
                    );
                  },
                }),
                r.a.createElement(
                  "div",
                  { className: n.buttonContainer },
                  r.a.createElement(
                    S.a,
                    {
                      className: n.button,
                      onClick: function () {
                        return a();
                      },
                      color: "primary",
                    },
                    r.a.createElement(w.a, null, "Cancel")
                  ),
                  r.a.createElement(
                    S.a,
                    {
                      type: "Submit",
                      className: n.button,
                      disabled: !e.isValid,
                      color: "primary",
                    },
                    r.a.createElement(w.a, null, "Update")
                  )
                )
              );
            }
          );
        },
        Pa = Object(v.a)(function (e) {
          return {
            container: {
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
            },
            paper: {
              position: "absolute",
              width: "40%",
              backgroundColor: e.palette.neutral.main,
              border: "2px solid #000",
              boxShadow: e.shadows[5],
              padding: e.spacing(2, 4, 3),
            },
          };
        }),
        Ba = function (e) {
          var a = e.records,
            t = e.setRecords,
            n = Pa(),
            l = r.a.useState(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = function () {
              R().then(function (e) {
                var a = e.data;
                t(a), c(!1);
              });
            };
          return r.a.createElement(
            "div",
            { className: n.container },
            r.a.createElement(
              ge.a,
              {
                onClick: function () {
                  c(!0);
                },
              },
              r.a.createElement(he.a, null)
            ),
            r.a.createElement(
              Ee.a,
              {
                fullWidth: !0,
                maxWidth: "md",
                open: i,
                onClose: s,
                "aria-labelledby": "form-dialog-title",
              },
              r.a.createElement(
                be.a,
                { disableTypography: !0 },
                r.a.createElement(w.a, { variant: "h2" }, "Edit Reflection")
              ),
              r.a.createElement(
                ye.a,
                null,
                r.a.createElement(Fa, { records: a, handleClose: s })
              )
            )
          );
        },
        Ia = t(509),
        Aa = t(143),
        Ta = Object(v.a)(function (e) {
          return {
            card: {
              margin: "0 0 1% 1%",
              width: "100%",
              background: e.palette.primary.light,
              color: e.palette.text.secondary,
              padding: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
            },
            description: { marginLeft: "5%", color: "white !important " },
            upload: { position: "absolute", bottom: 10, right: 10 },
            hidden: { display: "none" },
          };
        }),
        Da = function (e) {
          var a = Ta(),
            t = Object(n.useRef)(null),
            l = Object(n.useState)(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = Object(n.useState)(e),
            m = Object(C.a)(s, 2),
            u = m[0],
            d = m[1];
          return r.a.createElement(
            Q.a,
            { className: a.card },
            r.a.createElement(
              "div",
              { className: a.bio },
              r.a.createElement(
                w.a,
                { className: a.title, variant: "h2" },
                "This is a Reflection"
              ),
              r.a.createElement(w.a, null, "This is the blog introduction"),
              r.a.createElement("input", {
                className: a.hidden,
                type: "file",
                ref: t,
                accept: "image/*",
                multiple: !0,
                onChange: function (e) {
                  e.preventDefault();
                  var a = e.target.files;
                  if (!a.length) return !1;
                  if (a.length < 6) {
                    c(!0);
                    var t = new FormData();
                    for (var n in a)
                      if (a.hasOwnProperty(n)) {
                        var r = a[n];
                        t.append("image", r);
                      }
                    j()({
                      method: "post",
                      url: "/api/upload/images",
                      data: t,
                      headers: {
                        Authorization:
                          "Bearer: " +
                          JSON.parse(localStorage.getItem("token")),
                      },
                      responseType: "blob",
                    }).then(function (e) {
                      c(!1);
                    });
                  } else Ia.b.info("the max number is 5");
                },
              }),
              r.a.createElement(w.a, null, " Add your reflection!"),
              r.a.createElement(Ba, { records: u, setRecords: d }),
              r.a.createElement(
                "div",
                { className: a.upload },
                r.a.createElement(
                  Aa.a,
                  {
                    loading: i,
                    onClick: function () {
                      return t.current.click();
                    },
                  },
                  "Upload"
                )
              )
            )
          );
        },
        za = Object(v.a)(function (e) {
          return {
            form: {
              flexGrow: 1,
              padding: "0 5% 0 5%",
              "& .MuiFormLabel-root": { color: e.palette.text.primary },
            },
            divider: {
              width: "100%",
              backgroundColor: e.palette.secondary.main,
            },
            addButton: { marginTop: e.spacing(3) },
            buttonContainer: {
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            },
            addButtonContainer: { display: "flex", justifyContent: "center" },
          };
        }),
        Ma = function (e) {
          var a = e.type,
            t = e.label,
            n = e.index,
            l = e.record;
          return r.a.createElement(
            ve.a,
            { name: "projects[".concat(n, "].").concat(a) },
            function (e) {
              var a = e.field,
                n = e.meta;
              return r.a.createElement(Ne.a, {
                color: "primary",
                variant: "outlined",
                margin: "dense",
                fullWidth: !0,
                label: t,
                defaultValue: l,
                helperText: n.touched && n.error ? n.error : " ",
                onChange: a.onChange(a.name),
                onBlur: a.onBlur(a.name),
                error: n.touched && Boolean(n.error),
              });
            }
          );
        },
        Wa = function (e) {
          var a = e.type,
            t = e.label,
            n = e.index,
            l = e.record;
          return r.a.createElement(
            ve.a,
            { name: "projects[".concat(n, "].").concat(a) },
            function (e) {
              var a = e.field,
                n = e.meta;
              return r.a.createElement(Ne.a, {
                color: "primary",
                variant: "outlined",
                margin: "dense",
                fullWidth: !0,
                multiline: !0,
                rows: 4,
                label: t,
                defaultValue: l,
                helperText: n.touched && n.error ? n.error : " ",
                onChange: a.onChange(a.name),
                onBlur: a.onBlur(a.name),
                error: n.touched && Boolean(n.error),
              });
            }
          );
        },
        La = function (e) {
          var a = e.handleClose,
            t = e.records,
            n = za();
          return r.a.createElement(
            ve.c,
            { initialValues: { reflections: t }, onSubmit: function (e, a) {} },
            function (e) {
              return r.a.createElement(
                "form",
                { classes: n.form, onSubmit: e.handleSubmit },
                r.a.createElement(xe.a, { className: n.divider }),
                r.a.createElement(ve.b, {
                  name: "projects",
                  render: function (e) {
                    return r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(w.a, null, "Title"),
                      r.a.createElement(Ma, { type: "Title" }),
                      r.a.createElement(w.a, null, "Project"),
                      r.a.createElement(Wa, { type: "Content", rowsMax: 4 })
                    );
                  },
                }),
                r.a.createElement(
                  "div",
                  { className: n.buttonContainer },
                  r.a.createElement(
                    S.a,
                    {
                      className: n.button,
                      onClick: function () {
                        return a();
                      },
                      color: "primary",
                    },
                    r.a.createElement(w.a, null, "Cancel")
                  ),
                  r.a.createElement(
                    S.a,
                    {
                      type: "Submit",
                      className: n.button,
                      disabled: !e.isValid,
                      color: "primary",
                    },
                    r.a.createElement(w.a, null, "Update")
                  )
                )
              );
            }
          );
        },
        Ra = Object(v.a)(function (e) {
          return {
            container: {
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
            },
            paper: {
              position: "absolute",
              width: "40%",
              backgroundColor: e.palette.neutral.main,
              border: "2px solid #000",
              boxShadow: e.shadows[5],
              padding: e.spacing(2, 4, 3),
            },
          };
        }),
        Ja = function (e) {
          var a = e.records,
            t = e.setRecords,
            n = Ra(),
            l = r.a.useState(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = function () {
              R().then(function (e) {
                var a = e.data;
                t(a), c(!1);
              });
            };
          return r.a.createElement(
            "div",
            { className: n.container },
            r.a.createElement(
              ge.a,
              {
                onClick: function () {
                  c(!0);
                },
              },
              r.a.createElement(he.a, null)
            ),
            r.a.createElement(
              Ee.a,
              {
                fullWidth: !0,
                maxWidth: "md",
                open: i,
                onClose: s,
                "aria-labelledby": "form-dialog-title",
              },
              r.a.createElement(
                be.a,
                { disableTypography: !0 },
                r.a.createElement(w.a, { variant: "h2" }, "Edit Project")
              ),
              r.a.createElement(
                ye.a,
                null,
                r.a.createElement(La, { records: a, handleClose: s })
              )
            )
          );
        },
        qa = t(263),
        Va = t.n(qa),
        Ga = t(264),
        Ua = t.n(Ga),
        Ka = Object(v.a)(function (e) {
          return {
            card: {
              margin: "0 0 1% 1%",
              background: e.palette.primary.light,
              color: e.palette.text.secondary,
              padding: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
            },
            description: { marginLeft: "5%", color: "white !important " },
            large: {
              background: e.palette.secondary.light,
              width: "100%",
              height: "40%",
            },
            medium: { width: "100%", height: "30%" },
            small: { width: "49%", height: "30%" },
            upload: { position: "absolute", bottom: 10, right: 10 },
            hidden: { display: "none" },
          };
        }),
        _a = function (e) {
          var a,
            t = e.type,
            l = e.project,
            o = Ka(),
            i = Object(n.useRef)(null),
            c = Object(n.useState)(!1),
            s = Object(C.a)(c, 2),
            m = s[0],
            u = s[1],
            d = Object(n.useState)([]),
            p = Object(C.a)(d, 2),
            f = p[0],
            h = p[1],
            g = Object(n.useState)([]),
            E = Object(C.a)(g, 2),
            b = E[0],
            y = E[1];
          switch (t) {
            case "large":
              a = o.large;
              break;
            case "medium":
              a = o.medium;
              break;
            case "small":
              a = o.small;
              break;
            default:
              a = o.large;
          }
          var v = function (e) {
              e.preventDefault();
              var a = e.target.files;
              if (!a.length) return !1;
              if (a.length < 6) {
                u(!0);
                var t = new FormData();
                for (var n in a)
                  if (a.hasOwnProperty(n)) {
                    var r = a[n];
                    t.append("document", r);
                  }
                j()({
                  method: "post",
                  url: "/api/upload/files",
                  data: t,
                  headers: {
                    Authorization:
                      "Bearer: " + JSON.parse(localStorage.getItem("token")),
                  },
                  responseType: "blob",
                }).then(function (e) {
                  u(!1);
                });
              } else Ia.b.info("the max number is 5");
            },
            N = function () {
              return r.a.createElement(w.a, null, " Add your project!");
            },
            x = Object(n.useState)(l),
            S = Object(C.a)(x, 2),
            k = S[0],
            O = S[1];
          return r.a.createElement(
            Q.a,
            { className: "".concat(o.card, "  ").concat(a) },
            r.a.createElement(
              "div",
              { className: o.bio },
              "small" === t &&
                r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(
                    w.a,
                    { className: o.title, variant: "h3" },
                    "This is a small Project Card"
                  ),
                  r.a.createElement(
                    w.a,
                    null,
                    "This is the project description"
                  ),
                  r.a.createElement("input", {
                    className: o.hidden,
                    type: "file",
                    ref: i,
                    accept: ".PDF,.png,.jpeg.JPEG,.pdf,.mp4,.MP4,.DOCX,.docx",
                    multiple: !0,
                    onChange: v,
                  }),
                  N(),
                  r.a.createElement(Ja, { records: k, setRecords: O }),
                  r.a.createElement(
                    "div",
                    { className: o.upload },
                    r.a.createElement(
                      Aa.a,
                      {
                        loading: m,
                        onClick: function () {
                          return i.current.click();
                        },
                      },
                      "Upload"
                    )
                  )
                ),
              "medium" === t &&
                r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(
                    w.a,
                    { className: o.title, variant: "h2" },
                    "This is a medium Project Card"
                  ),
                  r.a.createElement(
                    w.a,
                    null,
                    "This is the project description"
                  ),
                  r.a.createElement("input", {
                    className: o.hidden,
                    type: "file",
                    ref: i,
                    accept: ".PDF,.png,.jpeg.JPEG,.pdf,.mp4,.MP4,.DOCX,.docx",
                    multiple: !0,
                    onChange: v,
                  }),
                  N(),
                  r.a.createElement(Ja, { records: k, setRecords: O }),
                  r.a.createElement(
                    "div",
                    { className: o.upload },
                    r.a.createElement(
                      Aa.a,
                      {
                        loading: m,
                        onClick: function () {
                          return i.current.click();
                        },
                      },
                      "Upload"
                    )
                  )
                ),
              "large" === t &&
                r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(
                    w.a,
                    { className: o.title, variant: "h1" },
                    "Showcase"
                  ),
                  r.a.createElement(
                    "div",
                    { style: { marginTop: 5 } },
                    r.a.createElement(
                      w.a,
                      { variant: "h4" },
                      " ",
                      "List uploaded files",
                      r.a.createElement(
                        Va.a,
                        {
                          onClick: function () {
                            L().then(function (e) {
                              200 === e.status && h(e.data);
                            });
                          },
                        },
                        " "
                      )
                    ),
                    r.a.createElement(
                      "div",
                      null,
                      f.map(function (e) {
                        return r.a.createElement(
                          "div",
                          { key: e.id },
                          e.fieldName
                        );
                      })
                    )
                  ),
                  r.a.createElement(
                    "div",
                    { style: { marginTop: 50 } },
                    r.a.createElement(
                      w.a,
                      { variant: "h4" },
                      " ",
                      "Download files",
                      r.a.createElement(
                        Ua.a,
                        {
                          onClick: function () {
                            L().then(function (e) {
                              200 === e.status &&
                                (y(e.data), console.log(123, f));
                            });
                          },
                        },
                        "Download files"
                      )
                    ),
                    b &&
                      b.map(function (e) {
                        return r.a.createElement(
                          "div",
                          { key: e._id },
                          r.a.createElement(
                            "a",
                            { href: e.fileLink },
                            e.fieldName
                          )
                        );
                      })
                  )
                )
            )
          );
        },
        Ya = t(494),
        $a = t(265),
        Za = t.n($a),
        Ha = t(516),
        Xa = t(493),
        Qa = t(512),
        et = Object(v.a)(function (e) {
          return {
            root: {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            },
            stepper: {
              width: "100%",
              "& .MuiStepLabel-label": { color: "#9e9e9e" },
              "& .MuiStepLabel-active": { color: e.palette.text.primary },
            },
            pageContainer: {
              height: "60vh",
              width: "100%",
              padding: e.spacing(2),
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
            },
            pageTitle: { marginBottom: e.spacing(1), width: "100%" },
            pageDescription: {
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
            },
            pageImage: {
              width: "50%",
              margin: e.spacing(1),
              alignSelf: "center",
            },
          };
        }),
        at = function (e) {
          var a = e.activeStep,
            n = et(),
            l = [
              "Welcome",
              "Editing your Portfolio",
              "Your Account",
              "Viewing other profiles",
              "Get Started",
            ];
          return r.a.createElement(
            "div",
            { className: n.root },
            r.a.createElement(
              "div",
              { className: n.pageContainer },
              (function (e) {
                switch (e) {
                  case 0:
                    return r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(
                        w.a,
                        { variant: "h1", className: n.pageTitle },
                        "Welcome to ePortfolio!"
                      ),
                      r.a.createElement(
                        "div",
                        { className: n.pageDescription },
                        r.a.createElement(
                          w.a,
                          null,
                          "Congratulations on creating your new portfolio, this tutorial will provide you with a brief overview of the features of our platform and how to make the most of your new portfolio."
                        ),
                        r.a.createElement("img", {
                          alt: "Welcome-page",
                          className: n.pageImage,
                          src: t(366),
                        })
                      )
                    );
                  case 1:
                    return r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(
                        w.a,
                        { variant: "h1", className: n.pageTitle },
                        "Editing your Profile"
                      ),
                      r.a.createElement(
                        "div",
                        { className: n.pageDescription },
                        r.a.createElement(
                          w.a,
                          null,
                          "Get started with your portfolio by editing what is displayed.",
                          r.a.createElement("br", null),
                          r.a.createElement("br", null),
                          "You can display your experience, education, key skills, projects and even write short reflections!",
                          r.a.createElement("br", null),
                          r.a.createElement("br", null),
                          "Click the ",
                          r.a.createElement(he.a, null),
                          " next to the content you wish to edit."
                        ),
                        r.a.createElement("img", {
                          alt: "Editing-Account-gif",
                          className: n.pageImage,
                          src: t(367),
                        })
                      )
                    );
                  case 2:
                    return r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(
                        w.a,
                        { variant: "h1", className: n.pageTitle },
                        "Update your Account Details"
                      ),
                      r.a.createElement(
                        "div",
                        { className: n.pageDescription },
                        r.a.createElement(
                          w.a,
                          null,
                          "You can edit account information in the 'My Account' section",
                          r.a.createElement("br", null),
                          r.a.createElement("br", null),
                          "Here you can update your personal information, contact details and information related to your ePortfolio account.",
                          r.a.createElement("br", null),
                          r.a.createElement("br", null),
                          "Upcoming features include editing your privacy settings."
                        ),
                        r.a.createElement("img", {
                          alt: "Editing-PersonalInfo-gif",
                          className: n.pageImage,
                          src: t(368),
                        })
                      )
                    );
                  case 3:
                    return r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(
                        w.a,
                        { variant: "h1", className: n.pageTitle },
                        "View other User Profiles"
                      ),
                      r.a.createElement(
                        "div",
                        { className: n.pageDescription },
                        r.a.createElement(
                          w.a,
                          { variant: "h2" },
                          "Coming Soon.."
                        )
                      )
                    );
                  case 4:
                  default:
                    return r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(
                        w.a,
                        { variant: "h1", className: n.pageTitle },
                        "Get Started with your Profile now!"
                      )
                    );
                }
              })(a),
              " "
            ),
            r.a.createElement(
              Ha.a,
              { className: n.stepper, activeStep: a },
              l.map(function (e, a) {
                var t = {};
                return r.a.createElement(
                  Xa.a,
                  Object.assign({ key: e }, {}),
                  r.a.createElement(Qa.a, t, e)
                );
              })
            )
          );
        },
        tt = Object(v.a)(function (e) {
          return {
            tutorialButton: { position: "fixed", bottom: 0, fontSize: 40 },
          };
        }),
        nt = r.a.forwardRef(function (e, a) {
          return r.a.createElement(
            Ya.a,
            Object.assign({ direction: "up", ref: a }, e)
          );
        }),
        rt = function () {
          var e = tt(),
            a = r.a.useState(!1),
            t = Object(C.a)(a, 2),
            n = t[0],
            l = t[1],
            o = function () {
              l(!1);
            },
            i = r.a.useState(0),
            c = Object(C.a)(i, 2),
            s = c[0],
            m = c[1];
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              ge.a,
              {
                className: e.tutorialButton,
                onClick: function () {
                  return l(!0);
                },
              },
              r.a.createElement(Za.a, { style: { fontSize: 40 } })
            ),
            r.a.createElement(
              Ee.a,
              {
                fullWidth: !0,
                maxWidth: "md",
                open: n,
                TransitionComponent: nt,
                keepMounted: !0,
                onClose: o,
              },
              r.a.createElement(
                ye.a,
                null,
                r.a.createElement(at, { activeStep: s })
              ),
              r.a.createElement(
                Le.a,
                null,
                r.a.createElement(
                  S.a,
                  { onClick: o, color: "primary" },
                  "Close"
                ),
                r.a.createElement(
                  S.a,
                  {
                    onClick: function () {
                      s > 0 &&
                        m(function (e) {
                          return e - 1;
                        });
                    },
                    color: "primary",
                    disabled: 0 === s,
                  },
                  "Previous"
                ),
                r.a.createElement(
                  S.a,
                  {
                    onClick: function () {
                      s < 4 &&
                        m(function (e) {
                          return e + 1;
                        });
                    },
                    color: "primary",
                    disabled: 4 === s,
                  },
                  "Next"
                )
              )
            )
          );
        },
        lt = t(282),
        ot = t(503),
        it = t(507),
        ct = Object(v.a)(function (e) {
          return {
            buttonContainer: { textAlign: "right" },
            button: { marginLeft: 8 },
          };
        }),
        st = function (e) {
          var a = e.handleClose,
            t = e.records,
            n = ct();
          return r.a.createElement(
            ot.a,
            {
              initialValues: Object(lt.a)({}, t),
              onFinish: function (e) {
                console.log(e),
                  q(e).then(function (e) {
                    e.data;
                    a();
                  });
              },
            },
            r.a.createElement(
              ot.a.Item,
              { name: "aboutMe" },
              r.a.createElement(it.a.TextArea, { rows: 4, column: 16 })
            ),
            r.a.createElement(
              "div",
              { className: n.buttonContainer },
              r.a.createElement(
                Aa.a,
                {
                  onClick: function () {
                    return a();
                  },
                },
                "Cancel"
              ),
              r.a.createElement(
                Aa.a,
                { htmlType: "submit", className: n.button },
                "Update"
              )
            )
          );
        },
        mt = Object(v.a)(function (e) {
          return {
            container: {
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
            },
            icon: { color: "rgba(255, 255, 255, 0.7)" },
            paper: {
              position: "absolute",
              width: "40%",
              backgroundColor: e.palette.neutral.main,
              border: "2px solid #000",
              boxShadow: e.shadows[5],
              padding: e.spacing(2, 4, 3),
            },
          };
        }),
        ut = function (e) {
          var a = e.records,
            t = e.setRecords,
            n = mt(),
            l = r.a.useState(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = function () {
              J().then(function (e) {
                var a = e.data;
                t({ aboutMe: a }), c(!1);
              });
            };
          return r.a.createElement(
            "div",
            { className: n.container },
            r.a.createElement(
              ge.a,
              {
                onClick: function () {
                  c(!0);
                },
              },
              r.a.createElement(he.a, { className: n.icon })
            ),
            r.a.createElement(
              Ee.a,
              {
                fullWidth: !0,
                maxWidth: "md",
                open: i,
                onClose: s,
                "aria-labelledby": "form-dialog-title",
              },
              r.a.createElement(
                be.a,
                { disableTypography: !0 },
                r.a.createElement(w.a, { variant: "h2" }, "Edit About")
              ),
              r.a.createElement(
                ye.a,
                null,
                r.a.createElement(st, { records: a, handleClose: s })
              )
            )
          );
        },
        dt = Object(v.a)(function (e) {
          return {
            characterCard: {
              margin: "0 0 1% 1%",
              width: "100%",
              background: e.palette.primary.light,
              padding: "5%",
              height: "20%",
            },
            bio: { marginLeft: "5%", flexGrow: 1, color: "white !important " },
          };
        }),
        pt = function () {
          var e = dt(),
            a = Object(n.useState)({}),
            t = Object(C.a)(a, 2),
            l = t[0],
            o = t[1];
          return (
            Object(n.useEffect)(function () {
              J()
                .then(function (e) {
                  var a = e.data;
                  o({ aboutMe: a });
                })
                .catch();
            }, []),
            r.a.createElement(
              Q.a,
              { className: e.characterCard },
              r.a.createElement(
                "div",
                { className: e.bio },
                r.a.createElement(
                  w.a,
                  { style: { color: "#fff" }, variant: "h2" },
                  "About Me"
                ),
                r.a.createElement(w.a, null, "Add About Me"),
                r.a.createElement(w.a, null, l.aboutMe),
                r.a.createElement(ut, { records: l, setRecords: o })
              )
            )
          );
        },
        ft = Object(v.a)(function (e) {
          return {
            loading: {
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            navSection: {
              position: "fixed",
              width: "25vw",
              height: "100vh",
              marginTop: "1%",
              zIndex: "100",
            },
            container: { maxWidth: "100%", overflowX: "hidden" },
            navBar: {
              marginLeft: "0.5em",
              background: e.palette.primary.main,
              color: e.palette.text.secondary,
            },
            navBarIcon: { fontSize: 30, color: "#FFFFFF" },
            sectionContainer: {
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              marginTop: "1%",
            },
            section: {
              width: "100vw",
              minHeight: "100vh",
              display: "flex",
              flexGrow: 1,
              paddingLeft: "25vw",
              paddingRight: "0.5em",
              flexFlow: "row wrap",
              alignItems: "stretch",
              transition: "all 700ms",
            },
          };
        }),
        ht = function () {
          var e = ft(),
            a = Object(n.useState)(1),
            t = Object(C.a)(a, 2),
            l = t[0],
            o = t[1],
            i = Object(n.useState)(null),
            c = Object(C.a)(i, 2),
            s = c[0],
            m = c[1],
            u = Object(n.useState)(null),
            d = Object(C.a)(u, 2),
            p = d[0],
            f = d[1],
            h = Object(n.useState)(null),
            g = Object(C.a)(h, 2),
            E = g[0],
            b = g[1];
          return (
            Object(n.useEffect)(function () {
              A()
                .then(function (e) {
                  var a = e.data;
                  m(a);
                })
                .catch(),
                D()
                  .then(function (e) {
                    var a = e.data;
                    f(a);
                  })
                  .catch(),
                _()
                  .then(function (e) {
                    var a = e.data;
                    b(a);
                  })
                  .catch();
            }, []),
            s && p && E
              ? r.a.createElement(
                  "div",
                  null,
                  r.a.createElement(
                    "div",
                    { className: e.container },
                    r.a.createElement(
                      "div",
                      { className: e.navSection },
                      r.a.createElement(
                        Q.a,
                        { className: e.navBar },
                        r.a.createElement(
                          ee.a,
                          null,
                          r.a.createElement(
                            ae.a,
                            {
                              button: !0,
                              onClick: function () {
                                return o(1);
                              },
                            },
                            r.a.createElement(
                              te.a,
                              null,
                              r.a.createElement(se.a, {
                                className: e.navBarIcon,
                              })
                            ),
                            r.a.createElement(ne.a, { primary: "My Profile" })
                          ),
                          r.a.createElement(
                            ae.a,
                            {
                              button: !0,
                              onClick: function () {
                                return o(2);
                              },
                            },
                            r.a.createElement(
                              te.a,
                              null,
                              r.a.createElement(ue.a, {
                                className: e.navBarIcon,
                              })
                            ),
                            r.a.createElement(ne.a, {
                              primary: "My Reflections",
                            })
                          ),
                          r.a.createElement(
                            ae.a,
                            {
                              button: !0,
                              onClick: function () {
                                return o(3);
                              },
                            },
                            r.a.createElement(
                              te.a,
                              null,
                              r.a.createElement(le.a, {
                                className: e.navBarIcon,
                              })
                            ),
                            r.a.createElement(ne.a, { primary: "My Projects" })
                          ),
                          r.a.createElement(
                            ae.a,
                            {
                              button: !0,
                              onClick: function () {
                                return o(4);
                              },
                            },
                            r.a.createElement(
                              te.a,
                              null,
                              r.a.createElement(ie.a, {
                                className: e.navBarIcon,
                              })
                            ),
                            r.a.createElement(ne.a, { primary: "About" })
                          )
                        )
                      ),
                      r.a.createElement(rt, null)
                    ),
                    r.a.createElement(
                      "div",
                      { className: e.sectionContainer },
                      r.a.createElement(
                        "div",
                        {
                          className: e.section,
                          style: { marginLeft: -100 * l + "vw" },
                        },
                        "Placeholder section"
                      ),
                      r.a.createElement(
                        "div",
                        { className: e.section },
                        r.a.createElement(Fe, { user: s }),
                        r.a.createElement(Na, { experience: E }),
                        r.a.createElement(oa, { education: p }),
                        r.a.createElement(Ca, { skills: s.skills })
                      ),
                      r.a.createElement(
                        "div",
                        { className: e.section },
                        r.a.createElement(Da, null),
                        r.a.createElement(Da, null),
                        r.a.createElement(Da, null)
                      ),
                      r.a.createElement(
                        "div",
                        { className: e.section },
                        r.a.createElement(_a, { type: "large" }),
                        r.a.createElement(_a, { type: "small" }),
                        r.a.createElement(_a, { type: "small" }),
                        r.a.createElement(_a, { type: "medium" })
                      ),
                      r.a.createElement(
                        "div",
                        { className: e.section },
                        r.a.createElement(pt, null)
                      )
                    )
                  )
                )
              : r.a.createElement(
                  "div",
                  null,
                  r.a.createElement(
                    "div",
                    { className: e.loading },
                    r.a.createElement(X.a, null),
                    r.a.createElement(
                      w.a,
                      { variant: "h2" },
                      "Fetching User Data"
                    )
                  )
                )
          );
        },
        gt = Object(v.a)(function (e) {
          return {
            characterCard: {
              margin: "0 0 1% 1%",
              width: "100%",
              background: e.palette.primary.light,
              padding: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            },
            profilePicture: { height: "5em", width: "5em", cursor: "pointer" },
            bio: { marginLeft: "5%", flexGrow: 1, color: "white !important " },
          };
        }),
        Et = function (e) {
          var a = e.user,
            t = gt();
          return r.a.createElement(
            Q.a,
            { className: t.characterCard },
            r.a.createElement(de.a, { className: t.profilePicture }),
            r.a.createElement(
              "div",
              { className: t.bio },
              r.a.createElement(
                w.a,
                { variant: "h2" },
                a.firstName,
                " ",
                a.lastName
              ),
              r.a.createElement(w.a, null, a.bio)
            )
          );
        },
        bt = Object(v.a)(function (e) {
          return {
            card: {
              margin: "0 0 1% 1%",
              width: "100%",
              padding: e.spacing(5),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            title: { width: "100%" },
            tableContainer: {
              width: "90%",
              paddingLeft: e.spacing(1),
              paddingRight: e.spacing(3),
            },
            table: { "& .MuiTableCell-body": {} },
            period: { width: "30%", verticalAlign: "top" },
            education: { verticalAlign: "top" },
          };
        }),
        yt = {
          1: "Jan",
          2: "Feb",
          3: "Mar",
          4: "Apr",
          5: "May",
          6: "Jun",
          7: "Jul",
          8: "Aug",
          9: "Sep",
          10: "Oct",
          11: "Nov",
          12: "Dec",
        },
        vt = function (e) {
          var a = e.education,
            t = bt();
          return r.a.createElement(
            Q.a,
            { className: t.card },
            r.a.createElement(
              w.a,
              { className: t.title, variant: "h2" },
              "Education",
              " "
            ),
            r.a.createElement(
              "div",
              { className: t.tableContainer },
              (function (e) {
                return Array.isArray(e) && e.length
                  ? r.a.createElement(
                      Pe.a,
                      { className: t.table },
                      r.a.createElement(
                        Be.a,
                        null,
                        e.map(function (e, a) {
                          return r.a.createElement(
                            Ie.a,
                            { key: a, className: t.table },
                            r.a.createElement(
                              Ae.a,
                              { className: t.period },
                              r.a.createElement(
                                w.a,
                                null,
                                yt[e.monthStart],
                                ", ",
                                e.yearStart,
                                " -",
                                yt[e.monthEnd],
                                ", ",
                                e.yearEnd
                              )
                            ),
                            r.a.createElement(
                              Ae.a,
                              { className: t.education },
                              r.a.createElement(
                                w.a,
                                { variant: "h4" },
                                e.schoolName
                              ),
                              "University" === e.edu_type
                                ? r.a.createElement(
                                    w.a,
                                    null,
                                    e.unicourseName,
                                    " ",
                                    e.unimajorName
                                  )
                                : ""
                            )
                          );
                        })
                      )
                    )
                  : r.a.createElement(w.a, null, " Add your education!");
              })(a)
            )
          );
        },
        Nt = Object(v.a)(function (e) {
          return {
            workSection: {
              margin: e.spacing(2),
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            },
            subTitle: {
              width: "100%",
              marginBottom: e.spacing(3),
              display: "flex",
              flexDirection: "row",
              "&::after": {
                content: '""',
                flex: "1 1",
                borderColor: "#D9D7D7",
                borderBottom: "1px solid",
                margin: "auto",
              },
            },
            tableContainer: {
              width: "90%",
              paddingLeft: e.spacing(1),
              paddingRight: e.spacing(3),
            },
            table: {
              "& .MuiTable-root": {
                borderBottom: "1px solid ".concat(e.palette.primary.light),
              },
            },
            addExperience: {
              display: "flex",
              justifyContent: "center",
              background: e.palette.neutral.light,
              borderRadius: e.spacing(2),
            },
            period: { width: "30%", verticalAlign: "top" },
            experience: { verticalAlign: "top" },
            organisation: { width: "100%" },
            role: { color: e.palette.primary.light },
            description: { marginTop: e.spacing(1) },
          };
        }),
        xt = {
          1: "Jan",
          2: "Feb",
          3: "Mar",
          4: "Apr",
          5: "May",
          6: "Jun",
          7: "Jul",
          8: "Aug",
          9: "Sep",
          10: "Oct",
          11: "Nov",
          12: "Dec",
        },
        wt = function (e) {
          var a = e.experience,
            t = e.globalClasses,
            n = Nt(),
            l = function (e) {
              return r.a.createElement(
                Pe.a,
                { className: n.table },
                r.a.createElement(
                  Be.a,
                  null,
                  e.map(function (e, a) {
                    return r.a.createElement(
                      Ie.a,
                      { key: a, className: n.table },
                      r.a.createElement(
                        Ae.a,
                        { className: n.period },
                        r.a.createElement(
                          w.a,
                          null,
                          xt[e.monthStart],
                          ", ",
                          e.yearStart,
                          " -",
                          xt[e.monthEnd],
                          ", ",
                          e.yearEnd
                        )
                      ),
                      r.a.createElement(
                        Ae.a,
                        { className: n.experience },
                        r.a.createElement(
                          w.a,
                          { className: n.organisation, variant: "h3" },
                          e.organization
                        ),
                        r.a.createElement(
                          w.a,
                          { className: n.role },
                          e.role,
                          " ",
                          ", ".concat(e.employeeStatus)
                        ),
                        r.a.createElement(
                          w.a,
                          { className: n.description },
                          e.description
                        )
                      )
                    );
                  })
                )
              );
            };
          return r.a.createElement(
            Q.a,
            { className: t.card },
            r.a.createElement(
              w.a,
              { className: t.title, variant: "h2" },
              "Experience",
              " "
            ),
            !(0 === a.employment.length) &&
              r.a.createElement(
                "div",
                { className: n.workSection },
                r.a.createElement(
                  w.a,
                  { className: n.subTitle, variant: "h3" },
                  "Professional Work"
                ),
                r.a.createElement(
                  "div",
                  { className: n.tableContainer },
                  l(a.employment)
                )
              ),
            !(0 === a.volunteering.length) &&
              r.a.createElement(
                "div",
                { className: n.workSection },
                r.a.createElement(
                  w.a,
                  { className: n.subTitle, variant: "h3" },
                  "Volunteer Work"
                ),
                r.a.createElement(
                  "div",
                  { className: n.tableContainer },
                  l(a.volunteering)
                )
              ),
            !(0 === a.extracurricular.length) &&
              r.a.createElement(
                "div",
                { className: n.workSection },
                r.a.createElement(
                  w.a,
                  { className: n.subTitle, variant: "h3" },
                  "Extracurricular Work"
                ),
                r.a.createElement(
                  "div",
                  { className: n.tableContainer },
                  l(a.extracurricular)
                )
              )
          );
        },
        St = Object(v.a)(function (e) {
          return {
            card: {
              margin: "0 0 1% 1%",
              width: "100%",
              height: "20%",
              padding: "5%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            title: { width: "100%" },
            skillsContainer: {
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              "& > *": { margin: e.spacing(0.5) },
            },
          };
        }),
        Ct = ["primary", "secondary"],
        kt = function (e) {
          var a = e.skills,
            t = e.globalClasses,
            n = St();
          return r.a.createElement(
            Q.a,
            { className: t.card },
            r.a.createElement(
              w.a,
              { className: t.title, variant: "h2" },
              "What I'm Good At"
            ),
            (function (e) {
              return r.a.createElement(
                "div",
                {
                  className: n.skillsContainer,
                  style: { height: 10 * e.length },
                },
                e.map(function (e, a) {
                  return r.a.createElement(xa.a, {
                    key: a,
                    label: e,
                    color: Ct[Math.floor(Math.random() * Ct.length)],
                  });
                })
              );
            })(a)
          );
        },
        jt = Object(v.a)(function (e) {
          return {
            card: {
              margin: "0 0 1% 1%",
              width: "100%",
              background: e.palette.primary.light,
              color: e.palette.text.secondary,
              padding: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
            },
            description: { marginLeft: "5%", color: "white !important " },
            upload: { position: "absolute", bottom: 10, right: 10 },
            hidden: { display: "none" },
          };
        }),
        Ot = function () {
          var e = jt();
          return r.a.createElement(
            Q.a,
            { className: e.card },
            r.a.createElement(
              "div",
              { className: e.bio },
              r.a.createElement(
                w.a,
                { className: e.title, variant: "h2" },
                "This is a Reflection"
              ),
              r.a.createElement(w.a, null, "This is the blog introduction")
            )
          );
        },
        Ft = Object(v.a)(function (e) {
          return {
            card: {
              margin: "0 0 1% 1%",
              background: e.palette.primary.light,
              color: e.palette.text.secondary,
              padding: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
            },
            description: { marginLeft: "5%", color: "white !important " },
            large: {
              background: e.palette.secondary.light,
              width: "100%",
              height: "60%",
            },
            medium: { width: "100%", height: "30%" },
            small: { width: "49%", height: "30%" },
            upload: { position: "absolute", bottom: 10, right: 10 },
            hidden: { display: "none" },
          };
        }),
        Pt = function (e) {
          var a,
            t = e.type,
            n = Ft();
          switch (t) {
            case "large":
              a = n.large;
              break;
            case "medium":
              a = n.medium;
              break;
            case "small":
              a = n.small;
              break;
            default:
              a = n.large;
          }
          return r.a.createElement(
            Q.a,
            { className: "".concat(n.card, "  ").concat(a) },
            r.a.createElement(
              "div",
              { className: n.bio },
              r.a.createElement(
                w.a,
                { className: n.title, variant: "h2" },
                "This is a ",
                t,
                " Project Card"
              ),
              r.a.createElement(w.a, null, "This is the project description")
            )
          );
        },
        Bt = Object(v.a)(function (e) {
          return {
            loading: {
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            navSection: {
              position: "fixed",
              width: "25vw",
              marginTop: "1%",
              zIndex: "100",
            },
            container: { maxWidth: "100%", overflowX: "hidden" },
            navBar: {
              marginLeft: "0.5em",
              background: e.palette.primary.main,
              color: e.palette.text.secondary,
            },
            navBarIcon: { fontSize: 30, color: "#FFFFFF" },
            sectionContainer: {
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              marginTop: "1%",
            },
            section: {
              width: "100vw",
              minHeight: "100vh",
              display: "flex",
              flexGrow: 1,
              paddingLeft: "25vw",
              paddingRight: "0.5em",
              flexFlow: "row wrap",
              alignItems: "stretch",
              transition: "all 700ms",
            },
            card: {
              margin: "0 0 1% 1%",
              width: "100%",
              padding: "5%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            title: { width: "100%" },
          };
        }),
        It = function (e) {
          var a = e.match,
            t = (e.location, a.params.userId),
            l = Bt(),
            o = Object(n.useState)(1),
            i = Object(C.a)(o, 2),
            c = i[0],
            s = i[1],
            m = Object(n.useState)(null),
            u = Object(C.a)(m, 2),
            d = u[0],
            p = u[1],
            f = Object(n.useState)(null),
            h = Object(C.a)(f, 2),
            g = h[0],
            E = h[1];
          Object(n.useEffect)(function () {
            Z(t)
              .then(function (e) {
                var a = e.data;
                p(a), console.log(a);
              })
              .catch(),
              H(t)
                .then(function (e) {
                  var a = e.data;
                  E(a);
                })
                .catch();
          });
          var b;
          return (
            d && g
              ? (console.log(0 === g.volunteering.length),
                (b = r.a.createElement(
                  "div",
                  null,
                  r.a.createElement(
                    "div",
                    { className: l.container },
                    r.a.createElement(
                      "div",
                      { className: l.navSection },
                      r.a.createElement(
                        Q.a,
                        { className: l.navBar },
                        r.a.createElement(
                          ee.a,
                          null,
                          r.a.createElement(
                            ae.a,
                            {
                              button: !0,
                              onClick: function () {
                                return s(1);
                              },
                            },
                            r.a.createElement(
                              te.a,
                              null,
                              r.a.createElement(se.a, {
                                className: l.navBarIcon,
                              })
                            ),
                            r.a.createElement(ne.a, { primary: "My Profile" })
                          ),
                          r.a.createElement(
                            ae.a,
                            {
                              button: !0,
                              onClick: function () {
                                return s(2);
                              },
                            },
                            r.a.createElement(
                              te.a,
                              null,
                              r.a.createElement(ue.a, {
                                className: l.navBarIcon,
                              })
                            ),
                            r.a.createElement(ne.a, {
                              primary: "My Reflections",
                            })
                          ),
                          r.a.createElement(
                            ae.a,
                            {
                              button: !0,
                              onClick: function () {
                                return s(3);
                              },
                            },
                            r.a.createElement(
                              te.a,
                              null,
                              r.a.createElement(le.a, {
                                className: l.navBarIcon,
                              })
                            ),
                            r.a.createElement(ne.a, { primary: "My Projects" })
                          )
                        )
                      )
                    ),
                    r.a.createElement(
                      "div",
                      { className: l.sectionContainer },
                      r.a.createElement(
                        "div",
                        {
                          className: l.section,
                          style: { marginLeft: -100 * c + "vw" },
                        },
                        "Placeholder section"
                      ),
                      r.a.createElement(
                        "div",
                        { className: l.section },
                        r.a.createElement(Et, { user: d, globalClasses: l }),
                        !(
                          0 === g.volunteering.length &&
                          0 === g.employment.length &&
                          0 === g.extracurricular.length
                        ) &&
                          r.a.createElement(wt, {
                            experience: g,
                            globalClasses: l,
                          }),
                        !(0 === d.education.length) &&
                          r.a.createElement(vt, {
                            education: d.education,
                            globalClasses: l,
                          }),
                        !(0 === d.skills.length) &&
                          r.a.createElement(kt, {
                            skills: d.skills,
                            globalClasses: l,
                          })
                      ),
                      r.a.createElement(
                        "div",
                        { className: l.section },
                        r.a.createElement(Ot, null),
                        r.a.createElement(Ot, null),
                        r.a.createElement(Ot, null)
                      ),
                      r.a.createElement(
                        "div",
                        { className: l.section },
                        r.a.createElement(Pt, { type: "large" }),
                        r.a.createElement(Pt, { type: "small" }),
                        r.a.createElement(Pt, { type: "small" }),
                        r.a.createElement(Pt, { type: "medium" })
                      )
                    )
                  )
                )))
              : (b = r.a.createElement(
                  "div",
                  null,
                  r.a.createElement(
                    "div",
                    { className: l.loading },
                    r.a.createElement(X.a, null),
                    r.a.createElement(
                      w.a,
                      { variant: "h2" },
                      "Fetching this Portfolio"
                    )
                  )
                )),
            b
          );
        },
        At = function (e) {
          var a = e.label,
            t = e.formikProps,
            n = e.formikKey,
            l = Object(p.a)(e, ["label", "formikProps", "formikKey"]);
          return r.a.createElement(
            Ne.a,
            Object.assign(
              {
                variant: "outlined",
                margin: "dense",
                fullWidth: !0,
                label: a,
                helperText: t.touched[n] && t.errors[n] ? t.errors[n] : " ",
                onChange: t.handleChange(n),
                onBlur: t.handleBlur(n),
                error: t.touched[n] && Boolean(t.errors[n]),
              },
              l
            )
          );
        },
        Tt = Ke.c().shape({ email: Ke.d().label("Email").email().required() }),
        Dt = Ke.c().shape({
          newPassword: Ke.d()
            .label("Password")
            .required()
            .min(5, "Password should be a minimum of 5 characters")
            .matches(
              /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
              "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
          confirmNewPassword: Ke.d()
            .required()
            .label("Confirm password")
            .test("passwords-match", "Passwords do not match", function (e) {
              return this.parent.newPassword === e;
            }),
        }),
        zt = function (e) {
          var a = e.user,
            t = e.globalClasses,
            l = Object(n.useState)(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = i ? t.fieldSubmitted : "",
            m = Object(n.useState)(!1),
            u = Object(C.a)(m, 2),
            d = u[0],
            p = u[1],
            f = d ? t.fieldSubmitted : "";
          return r.a.createElement(
            Q.a,
            { className: t.card },
            r.a.createElement(
              "div",
              { className: t.title },
              r.a.createElement(w.a, { variant: "h2" }, "Account information")
            ),
            r.a.createElement(
              "div",
              { className: t.formContainer },
              r.a.createElement(
                w.a,
                { variant: "h2", className: t.formTitle },
                "Update your Email"
              ),
              r.a.createElement(
                ve.c,
                {
                  initialValues: { email: a.email },
                  onSubmit: function (e, a) {
                    c(!1),
                      G({ email: e.email })
                        .then(function (e) {
                          c(!0), a.setSubmitting(!1);
                        })
                        .catch(function (e) {
                          console.log(e),
                            a.setFieldError("email", e.response.data),
                            a.setSubmitting(!1);
                        });
                  },
                  validationSchema: Tt,
                },
                function (e) {
                  return r.a.createElement(
                    "form",
                    { className: t.form, onSubmit: e.handleSubmit },
                    r.a.createElement(At, {
                      label: "Email",
                      formikProps: e,
                      formikKey: "email",
                      required: !0,
                      className: "".concat(t.field, " ").concat(s),
                      defaultValue: e.initialValues.email,
                    }),
                    r.a.createElement(
                      "div",
                      { className: t.buttonWrapper },
                      r.a.createElement(
                        S.a,
                        {
                          type: "Submit",
                          fullWidth: !0,
                          variant: "contained",
                          color: "secondary",
                          disabled: !e.isValid || e.isSubmitting,
                        },
                        r.a.createElement(w.a, null, "Update")
                      ),
                      e.isSubmitting &&
                        r.a.createElement(X.a, {
                          size: 24,
                          className: t.buttonProgress,
                        })
                    )
                  );
                }
              )
            ),
            r.a.createElement(
              "div",
              { className: t.formContainer },
              r.a.createElement(
                w.a,
                { variant: "h2", className: t.formTitle },
                "Update your Password"
              ),
              r.a.createElement(
                ve.c,
                {
                  initialValues: {
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                  },
                  onSubmit: function (e, a) {
                    p(!1),
                      U({
                        oldPassword: e.oldPassword,
                        newPassword: e.newPassword,
                      })
                        .then(function (e) {
                          p(!0), a.setSubmitting(!1);
                        })
                        .catch(function (e) {
                          console.log(e),
                            a.setFieldError("oldPassword", e.response.data),
                            a.setSubmitting(!1);
                        });
                  },
                  validationSchema: Dt,
                },
                function (e) {
                  return r.a.createElement(
                    "form",
                    { className: t.form, onSubmit: e.handleSubmit },
                    r.a.createElement(At, {
                      label: "Current Password",
                      formikProps: e,
                      formikKey: "oldPassword",
                      type: "password",
                      required: !0,
                      className: "".concat(t.field, " ").concat(f),
                    }),
                    r.a.createElement(At, {
                      label: "Password",
                      formikProps: e,
                      formikKey: "newPassword",
                      type: "password",
                      required: !0,
                      className: "".concat(t.field, " ").concat(f),
                    }),
                    r.a.createElement(At, {
                      label: "Confirm Password",
                      formikProps: e,
                      formikKey: "confirmNewPassword",
                      type: "password",
                      required: !0,
                      className: "".concat(t.field, " ").concat(f),
                    }),
                    r.a.createElement(
                      "div",
                      { className: t.buttonWrapper },
                      r.a.createElement(
                        S.a,
                        {
                          type: "Submit",
                          fullWidth: !0,
                          variant: "contained",
                          color: "secondary",
                          disabled: !e.isValid || e.isSubmitting,
                        },
                        r.a.createElement(w.a, null, "Update")
                      ),
                      e.isSubmitting &&
                        r.a.createElement(X.a, {
                          size: 24,
                          className: t.buttonProgress,
                        })
                    )
                  );
                }
              )
            )
          );
        },
        Mt = Ke.c().shape({
          firstName: Ke.d()
            .required()
            .label("First Name")
            .test(
              "length",
              "First Name must have more than 1 character",
              function (e) {
                return e && e.length > 2;
              }
            )
            .test("alphabets", "Name must only contain alphabets", function (
              e
            ) {
              return /^[A-Za-z ]+$/.test(e);
            }),
          lastName: Ke.d()
            .required()
            .label("Last Name")
            .test(
              "length",
              "Last Name must have more than 1 character",
              function (e) {
                return e && e.length > 2;
              }
            )
            .test("alphabets", "Name must only contain alphabets", function (
              e
            ) {
              return /^[A-Za-z ]+$/.test(e);
            }),
          mobileNumber: Ke.d()
            .label("Mobile Number")
            .test("valid", "Phone Number is not valid", function (e) {
              return /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(
                e
              );
            }),
        }),
        Wt = function (e) {
          var a = e.user,
            t = e.globalClasses,
            l = Object(n.useState)(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = i ? t.fieldSubmitted : "";
          return r.a.createElement(
            Q.a,
            { className: t.card },
            r.a.createElement(
              "div",
              { className: t.title },
              r.a.createElement(w.a, { variant: "h2" }, "Personal information")
            ),
            r.a.createElement(
              "div",
              { className: t.formContainer },
              r.a.createElement(
                ve.c,
                {
                  initialValues: {
                    firstName: a.firstName,
                    lastName: a.lastName,
                    mobileNumber: a.mobileNumber,
                    birthDate: a.birthDate,
                  },
                  onSubmit: function (e, a) {
                    c(!1),
                      V({
                        firstName: e.firstName,
                        lastName: e.lastName,
                        mobileNumber: e.mobileNumber,
                        birthDate: e.birthDate,
                      })
                        .then(function (e) {
                          c(!0), a.setSubmitting(!1);
                        })
                        .catch(function (e) {
                          console.log(e),
                            a.setFieldError("mobileNumber", e.response.data),
                            a.setSubmitting(!1);
                        });
                  },
                  validationSchema: Mt,
                },
                function (e) {
                  return r.a.createElement(
                    "form",
                    { className: t.form, onSubmit: e.handleSubmit },
                    r.a.createElement(
                      We.a,
                      { container: !0, spacing: 2 },
                      r.a.createElement(
                        We.a,
                        { item: !0, xs: 12, sm: 6 },
                        r.a.createElement(At, {
                          label: "FirstName",
                          formikProps: e,
                          formikKey: "firstName",
                          required: !0,
                          defaultValue: a.firstName,
                          className: "".concat(t.field, " ").concat(s),
                        })
                      ),
                      r.a.createElement(
                        We.a,
                        { item: !0, xs: 12, sm: 6 },
                        r.a.createElement(At, {
                          label: "LastName",
                          formikProps: e,
                          formikKey: "lastName",
                          required: !0,
                          defaultValue: a.lastName,
                          className: "".concat(t.field, " ").concat(s),
                        })
                      )
                    ),
                    r.a.createElement(At, {
                      label: "Mobile Number",
                      formikProps: e,
                      formikKey: "mobileNumber",
                      required: !0,
                      defaultValue: a.mobileNumber,
                      className: "".concat(t.field, " ").concat(s),
                    }),
                    r.a.createElement(At, {
                      label: "Date of Birth",
                      formikProps: e,
                      formikKey: "birthDate",
                      type: "date",
                      required: !0,
                      defaultValue:
                        void 0 !== a.birthDate && null !== a.birthDate
                          ? a.birthDate.substring(0, 10)
                          : new Date(),
                      className: "".concat(t.field, " ").concat(s),
                      InputLabelProps: { shrink: !0 },
                    }),
                    r.a.createElement(
                      "div",
                      { className: t.buttonWrapper },
                      r.a.createElement(
                        S.a,
                        {
                          type: "Submit",
                          fullWidth: !0,
                          variant: "contained",
                          disabled: !e.isValid || e.isSubmitting,
                          color: "secondary",
                        },
                        r.a.createElement(w.a, null, "Update")
                      ),
                      e.isSubmitting &&
                        r.a.createElement(X.a, {
                          size: 24,
                          className: t.buttonProgress,
                        })
                    )
                  );
                }
              )
            )
          );
        },
        Lt = Ke.c().shape({}),
        Rt = function (e) {
          var a = e.user,
            t = e.globalClasses,
            l = Object(n.useState)(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = i ? t.fieldSubmitted : "";
          return r.a.createElement(
            Q.a,
            { className: t.card },
            r.a.createElement(
              "div",
              { className: t.title },
              r.a.createElement(w.a, { variant: "h2" }, "Profile Settings")
            ),
            r.a.createElement(
              "div",
              { className: t.formContainer },
              r.a.createElement(
                ve.c,
                {
                  initialValues: { url: a.url },
                  onSubmit: function (e, a) {
                    c(!1),
                      V({ url: e.url })
                        .then(function (e) {
                          c(!0), a.setSubmitting(!1);
                        })
                        .catch(function (e) {
                          console.log(e),
                            a.setFieldError("url", e.response.data),
                            a.setSubmitting(!1);
                        });
                  },
                  validationSchema: Lt,
                },
                function (e) {
                  return r.a.createElement(
                    "form",
                    { className: t.form, onSubmit: e.handleSubmit },
                    r.a.createElement(At, {
                      label: "Custom URL",
                      formikProps: e,
                      formikKey: "url",
                      required: !0,
                      value: a.url,
                      className: "".concat(t.field, " ").concat(s),
                    }),
                    r.a.createElement(
                      "div",
                      { className: t.buttonWrapper },
                      r.a.createElement(
                        S.a,
                        {
                          type: "Submit",
                          color: "secondary",
                          fullWidth: !0,
                          variant: "contained",
                          disabled: !e.isValid || e.isSubmitting,
                        },
                        r.a.createElement(w.a, null, "Update")
                      ),
                      e.isSubmitting &&
                        r.a.createElement(X.a, {
                          size: 24,
                          className: t.buttonProgress,
                        })
                    )
                  );
                }
              )
            )
          );
        },
        Jt = Object(v.a)(function (e) {
          return {
            loading: {
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            navSection: {
              position: "fixed",
              width: "25vw",
              marginTop: "1%",
              zIndex: "100",
            },
            container: { maxWidth: "100%", overflowX: "hidden" },
            navBar: {
              marginLeft: "0.5em",
              background: e.palette.primary.main,
              color: e.palette.text.secondary,
            },
            navBarIcon: { fontSize: 30, color: "#FFFFFF" },
            sectionContainer: {
              position: "absolute",
              display: "flex",
              zIndex: "-1",
              marginTop: "1%",
            },
            section: {
              width: "100vw",
              minHeight: "100vh",
              display: "flex",
              flexGrow: 1,
              paddingLeft: "25vw",
              paddingRight: "0.5em",
              flexFlow: "row wrap",
              alignItems: "stretch",
              transition: "all 700ms",
            },
            card: {
              margin: "0 0 1% 1%",
              width: "100%",
              padding: "5%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
            title: {
              width: "100%",
              marginBottom: e.spacing(3),
              display: "flex",
              flexDirection: "row",
              "&::after": {
                content: '""',
                flex: "1 1",
                borderColor: "#D9D7D7",
                borderBottom: "1px solid",
                margin: "auto",
              },
            },
            formContainer: {
              width: "100%",
              height: "30%",
              display: "flex",
              marginBottom: e.spacing(2),
            },
            form: { width: "100%", display: "flex", flexDirection: "column" },
            formTitle: { width: "25%" },
            field: {
              flexGrow: 1,
              "& .MuiFormLabel-root": { color: e.palette.text.primary },
            },
            fieldSubmitted: {
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: e.palette.secondary.main },
              },
            },
            buttonWrapper: {
              margin: e.spacing(1),
              position: "relative",
              alignSelf: "flex-end",
            },
            buttonProgress: {
              color: e.palette.secondary.main,
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: -12,
              marginLeft: -12,
            },
          };
        }),
        qt = function () {
          var e = Jt(),
            a = Object(n.useState)(!0),
            t = Object(C.a)(a, 2),
            l = t[0],
            o = t[1],
            i = Object(n.useState)(null),
            c = Object(C.a)(i, 2),
            s = c[0],
            m = c[1];
          return (
            Object(n.useEffect)(function () {
              I().then(function (e) {
                var a = e.data;
                m(a), o(!1);
              });
            }, []),
            l
              ? r.a.createElement(
                  "div",
                  { className: e.loading },
                  r.a.createElement(X.a, null),
                  r.a.createElement(
                    w.a,
                    { variant: "h2" },
                    "Fetching User Data"
                  )
                )
              : r.a.createElement(
                  "div",
                  { className: e.container },
                  r.a.createElement(
                    "div",
                    { className: e.navSection },
                    r.a.createElement(
                      Q.a,
                      { className: e.navBar },
                      r.a.createElement(
                        ee.a,
                        null,
                        r.a.createElement(
                          ae.a,
                          { button: !0 },
                          r.a.createElement(
                            te.a,
                            null,
                            r.a.createElement(se.a, { className: e.navBarIcon })
                          ),
                          r.a.createElement(ne.a, { primary: "My Information" })
                        )
                      )
                    ),
                    r.a.createElement(rt, null)
                  ),
                  r.a.createElement(
                    "div",
                    { className: e.sectionContainer },
                    r.a.createElement(
                      "div",
                      { className: e.section },
                      r.a.createElement(zt, { user: s, globalClasses: e }),
                      r.a.createElement(Wt, { user: s, globalClasses: e }),
                      r.a.createElement(Rt, { user: s, globalClasses: e })
                    )
                  )
                )
          );
        },
        Vt = t(188),
        Gt = t.n(Vt),
        Ut = Object(v.a)(function (e) {
          return {
            title: { marginLeft: "5%", flexGrow: 1 },
            banner: e.mixins.toolbar,
            link: { textDecoration: "none", marginRight: e.spacing(2) },
            bkgContainer: {
              width: "100vw",
              height: "100vh",
              zIndex: -1,
              position: "fixed",
              backgroundImage: "url(".concat(Gt.a, ")"),
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              overflowY: "auto",
              overflowX: "hidden",
            },
            contentContainer: { zIndex: 10 },
          };
        }),
        Kt = function (e) {
          e.match;
          var a = Object(d.g)(),
            t = Ut();
          return r.a.createElement(
            "div",
            { className: t.bkgContainer },
            r.a.createElement(
              N.a,
              { position: "fixed" },
              r.a.createElement(
                x.a,
                null,
                r.a.createElement(
                  w.a,
                  { variant: "h3", className: t.title },
                  "ePortfolio"
                ),
                r.a.createElement(
                  u.b,
                  { to: "/myprofile", className: t.link },
                  r.a.createElement(
                    w.a,
                    { color: "textSecondary" },
                    "My Profile"
                  )
                ),
                r.a.createElement(
                  u.b,
                  { to: "/myaccount", className: t.link },
                  r.a.createElement(
                    w.a,
                    { color: "textSecondary" },
                    "My Account"
                  )
                ),
                r.a.createElement(
                  S.a,
                  {
                    color: "inherit",
                    onClick: function () {
                      b(function () {
                        return a.push("/home/login");
                      });
                    },
                  },
                  "Logout"
                )
              )
            ),
            r.a.createElement("div", { className: t.banner }, " "),
            r.a.createElement(
              "div",
              { className: t.contentContainer },
              r.a.createElement(
                d.d,
                null,
                r.a.createElement(
                  y,
                  { exact: !0, path: "/" },
                  r.a.createElement(d.a, { to: "/myprofile" })
                ),
                r.a.createElement(y, {
                  exact: !0,
                  path: "/myprofile",
                  component: ht,
                }),
                r.a.createElement(y, {
                  exact: !0,
                  path: "/myaccount",
                  component: qt,
                }),
                r.a.createElement(y, { path: "/view/:userId", component: It })
              )
            )
          );
        },
        _t = Object(v.a)(function (e) {
          return {
            title: { marginLeft: "5%", flexGrow: 1 },
            banner: e.mixins.toolbar,
            link: { textDecoration: "none", marginRight: e.spacing(2) },
            bkgContainer: {
              width: "100vw",
              height: "100vh",
              zIndex: -1,
              position: "fixed",
              backgroundImage: "url(".concat(Gt.a, ")"),
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              overflowY: "auto",
              overflowX: "hidden",
            },
            contentContainer: { zIndex: 10 },
          };
        }),
        Yt = function (e) {
          e.match;
          var a = _t();
          return r.a.createElement(
            "div",
            { className: a.bkgContainer },
            r.a.createElement(
              N.a,
              { position: "fixed" },
              r.a.createElement(
                x.a,
                null,
                r.a.createElement(
                  u.b,
                  { to: "/home/landing", className: a.link },
                  r.a.createElement(
                    w.a,
                    {
                      variant: "h3",
                      color: "textSecondary",
                      className: a.title,
                    },
                    "ePortfolio"
                  )
                )
              )
            ),
            r.a.createElement("div", { className: a.banner }, " "),
            r.a.createElement(
              "div",
              { className: a.contentContainer },
              r.a.createElement(
                d.d,
                null,
                r.a.createElement(d.b, { path: "/view/:userId", component: It })
              )
            )
          );
        },
        $t = t(272),
        Zt = t.n($t),
        Ht = t(499),
        Xt = t(273),
        Qt = t(274),
        en = t.n(Qt),
        an = Ke.c().shape({
          email: Ke.d().label("Email").email().required(),
          password: Ke.d().label("Password").required(),
        }),
        tn = t(275),
        nn = t.n(tn),
        rn = t(276),
        ln = t.n(rn),
        on = Object(v.a)(function (e) {
          return {
            rememberMe: { color: e.palette.text.secondary },
            loginDivider: {
              margin: "".concat(e.spacing(2), "px 0"),
              backgroundColor: "#FFFFFF",
            },
            signupButton: {
              margin: "".concat(e.spacing(1), "px 0"),
              color: e.palette.text.secondary,
              backgroundColor: e.palette.secondary.main,
            },
            googleButton: {
              marginTop: "".concat(e.spacing(1), "px"),
              color: "#FFFFFF",
              backgroundColor: "#4285F4",
              "&:hover": { color: "#FFFFFF", backgroundColor: "#1A4d94" },
            },
            gitHubButton: {
              marginTop: "".concat(e.spacing(1), "px"),
              color: "#FFFFFF",
              backgroundColor: "#4168b1",
              "&:hover": { backgroundColor: "#3c5fa2" },
            },
            buttonLogo: {
              width: "".concat(e.spacing(3), "px"),
              height: "".concat(e.spacing(3), "px"),
            },
          };
        }),
        cn = function (e) {
          var a = e.globalClasses,
            t = on(),
            l = Object(n.useState)(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1],
            s = function (e) {
              var a;
              console.log(e),
                (a = e.tokenId),
                P(a)
                  .then(function (e) {
                    console.log(e.data), g(e.data.token), c(!0);
                  })
                  .catch(function (e) {
                    console.log("GOOGLE SIGNIN ERROR", e.response);
                  });
            },
            m = function (e) {
              var a, t;
              (a = e.userID),
                (t = e.accessToken),
                B(a, t)
                  .then(function (e) {
                    console.log(e.data), g(e.data.token), c(!0);
                  })
                  .catch(function (e) {
                    console.log("FACEBOOK SIGNIN ERROR", e.response);
                  });
            };
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement(
              "div",
              { className: a.banner },
              r.a.createElement(w.a, { variant: "h1" }, "Login to your Profile")
            ),
            r.a.createElement(
              "div",
              { className: a.formContainer },
              i && r.a.createElement(d.a, { to: "/" }),
              !i &&
                r.a.createElement(
                  "div",
                  { className: a.formPaper },
                  r.a.createElement(
                    ve.c,
                    {
                      initialValues: { email: "", password: "" },
                      onSubmit: function (e, a) {
                        F({ email: e.email, password: e.password })
                          .then(function (e) {
                            200 === e.status && (g(e.data.token), c(!0));
                          })
                          .catch(function (e) {
                            console.log(e),
                              a.setErrors({
                                email: e.response.data,
                                password: e.response.data,
                              });
                          });
                      },
                      validationSchema: an,
                    },
                    function (e) {
                      return r.a.createElement(
                        "form",
                        { className: a.form, onSubmit: e.handleSubmit },
                        r.a.createElement(At, {
                          label: "Email",
                          formikProps: e,
                          formikKey: "email",
                          required: !0,
                          className: a.inputField,
                        }),
                        r.a.createElement(At, {
                          label: "Password",
                          formikProps: e,
                          formikKey: "password",
                          type: "password",
                          required: !0,
                          className: a.inputField,
                        }),
                        r.a.createElement(ze.a, {
                          className: t.rememberMe,
                          control: r.a.createElement(Me.a, {
                            value: "remember",
                            color: "default",
                          }),
                          label: "Remember me",
                        }),
                        r.a.createElement(
                          S.a,
                          {
                            type: "Submit",
                            fullWidth: !0,
                            variant: "contained",
                            className: a.submit,
                            disabled: !e.isValid,
                          },
                          r.a.createElement(w.a, null, "Log In")
                        ),
                        r.a.createElement(xe.a, { className: t.loginDivider }),
                        r.a.createElement(
                          Ht.a,
                          { href: "./signup", underline: "none" },
                          r.a.createElement(
                            S.a,
                            {
                              fullWidth: !0,
                              variant: "contained",
                              className: a.submit,
                            },
                            "Signup for a Portfolio"
                          )
                        ),
                        r.a.createElement(
                          We.a,
                          { container: !0, spacing: 1 },
                          r.a.createElement(
                            We.a,
                            { item: !0, xs: 6 },
                            r.a.createElement(Xt.GoogleLogin, {
                              clientId: "".concat(
                                "254271257364-v0p3fi4ean8f3qj73566966lq3qba3mo.apps.googleusercontent.com"
                              ),
                              onSuccess: s,
                              onFailure: s,
                              cookiePolicy: "single_host_origin",
                              render: function (e) {
                                return r.a.createElement(
                                  S.a,
                                  {
                                    fullWidth: !0,
                                    variant: "contained",
                                    className: t.googleButton,
                                    startIcon: r.a.createElement("img", {
                                      alt: "google-logo",
                                      src: nn.a,
                                      className: t.buttonLogo,
                                    }),
                                    onClick: e.onClick,
                                    disabled: e.disabled,
                                  },
                                  "Sign in with Google"
                                );
                              },
                            })
                          ),
                          r.a.createElement(
                            We.a,
                            { item: !0, xs: 6 },
                            r.a.createElement(en.a, {
                              appId: "".concat("1811636712317299"),
                              autoLoad: !1,
                              callback: m,
                              render: function (e) {
                                return r.a.createElement(
                                  S.a,
                                  {
                                    fullWidth: !0,
                                    variant: "contained",
                                    className: t.gitHubButton,
                                    startIcon: r.a.createElement(ln.a, {
                                      className: t.buttonLogo,
                                    }),
                                    onClick: e.onClick,
                                  },
                                  "Sign in with Facebook"
                                );
                              },
                            })
                          )
                        )
                      );
                    }
                  )
                )
            )
          );
        },
        sn = t(189),
        mn = t.n(sn),
        un = Ke.c().shape({
          email: Ke.d().label("Email").email().required(),
          password: Ke.d()
            .label("Password")
            .required()
            .min(5, "Password should be a minimum of 5 characters")
            .matches(
              /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
              "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
          confirmPassword: Ke.d()
            .required()
            .label("Confirm password")
            .test("passwords-match", "Passwords do not match", function (e) {
              return this.parent.password === e;
            }),
        }),
        dn = function (e) {
          var a = e.globalClasses,
            t = a,
            l = Object(n.useState)(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1];
          return i
            ? r.a.createElement(
                "div",
                { className: t.formContainer },
                r.a.createElement(
                  "div",
                  { className: t.successBoard },
                  r.a.createElement(
                    de.a,
                    { className: t.avatar },
                    r.a.createElement(mn.a, { className: t.icon })
                  ),
                  r.a.createElement(w.a, { variant: "h2" }, "Congratulations!"),
                  r.a.createElement(
                    w.a,
                    null,
                    "You now have an academic ePorfolio, login and start editing!"
                  ),
                  r.a.createElement(
                    S.a,
                    {
                      type: "Submit",
                      fullWidth: !0,
                      variant: "contained",
                      className: t.landingButton,
                    },
                    r.a.createElement(
                      Ht.a,
                      { href: "./login", variant: "body2", color: "inherit" },
                      "Click here to login"
                    )
                  )
                )
              )
            : r.a.createElement(
                r.a.Fragment,
                null,
                r.a.createElement(
                  "div",
                  { className: a.banner },
                  r.a.createElement(
                    w.a,
                    { variant: "h1", color: "textSecondary" },
                    "Reset your new Portfolio"
                  )
                ),
                r.a.createElement(
                  "div",
                  { className: t.formContainer },
                  r.a.createElement(
                    "div",
                    { className: t.formPaper },
                    r.a.createElement(
                      ve.c,
                      {
                        initialValues: {
                          email: "",
                          password: "",
                          confirmPassword: "",
                        },
                        onSubmit: function (e, a) {
                          O({
                            firstName: e.firstName,
                            lastName: e.lastName,
                            email: e.email,
                            password: e.password,
                          })
                            .then(function (e) {
                              c(!0);
                            })
                            .catch(function (e) {
                              a.setFieldError("email", e.response.data),
                                a.setSubmitting(!1);
                            });
                        },
                        validationSchema: un,
                      },
                      function (e) {
                        return r.a.createElement(
                          "form",
                          { className: t.form, onSubmit: e.handleSubmit },
                          r.a.createElement(At, {
                            label: "Email",
                            formikProps: e,
                            formikKey: "email",
                            required: !0,
                            className: t.inputField,
                          }),
                          r.a.createElement(At, {
                            label: "Password",
                            formikProps: e,
                            formikKey: "password",
                            type: "password",
                            required: !0,
                            className: t.inputField,
                          }),
                          r.a.createElement(At, {
                            label: "Confirm Password",
                            formikProps: e,
                            formikKey: "confirmPassword",
                            type: "password",
                            required: !0,
                            className: t.inputField,
                          }),
                          r.a.createElement(
                            S.a,
                            {
                              type: "Submit",
                              fullWidth: !0,
                              variant: "contained",
                              className: t.submit,
                              disabled: !e.isValid,
                              color: "primary",
                            },
                            r.a.createElement(w.a, null, "Reset")
                          ),
                          r.a.createElement(
                            We.a,
                            { container: !0 },
                            r.a.createElement(
                              We.a,
                              { item: !0, xs: !0 },
                              r.a.createElement(
                                Ht.a,
                                {
                                  href: "./login",
                                  variant: "body2",
                                  color: "textSecondary",
                                },
                                "Log In"
                              )
                            )
                          )
                        );
                      }
                    )
                  )
                )
              );
        },
        pn = Ke.c().shape({
          firstName: Ke.d()
            .required()
            .label("First Name")
            .test(
              "length",
              "First Name must have more than 1 character",
              function (e) {
                return e && e.length > 2;
              }
            )
            .test("alphabets", "Name must only contain alphabets", function (
              e
            ) {
              return /^[A-Za-z]+$/.test(e);
            }),
          lastName: Ke.d()
            .required()
            .label("Last Name")
            .test(
              "length",
              "Last Name must have more than 1 character",
              function (e) {
                return e && e.length > 2;
              }
            )
            .test("alphabets", "Name must only contain alphabets", function (
              e
            ) {
              return /^[A-Za-z]+$/.test(e);
            }),
          email: Ke.d().label("Email").email().required(),
          password: Ke.d()
            .label("Password")
            .required()
            .min(5, "Password should be a minimum of 5 characters")
            .matches(
              /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
              "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
          confirmPassword: Ke.d()
            .required()
            .label("Confirm password")
            .test("passwords-match", "Passwords do not match", function (e) {
              return this.parent.password === e;
            }),
        }),
        fn = function (e) {
          var a = e.globalClasses,
            t = a,
            l = Object(n.useState)(!1),
            o = Object(C.a)(l, 2),
            i = o[0],
            c = o[1];
          return i
            ? r.a.createElement(
                "div",
                { className: t.formContainer },
                r.a.createElement(
                  "div",
                  { className: t.successBoard },
                  r.a.createElement(
                    de.a,
                    { className: t.avatar },
                    r.a.createElement(mn.a, { className: t.icon })
                  ),
                  r.a.createElement(w.a, { variant: "h2" }, "Congratulations!"),
                  r.a.createElement(
                    w.a,
                    null,
                    "You now have an academic ePorfolio, login and start editing!"
                  ),
                  r.a.createElement(
                    S.a,
                    {
                      type: "Submit",
                      fullWidth: !0,
                      variant: "contained",
                      className: t.landingButton,
                    },
                    r.a.createElement(
                      Ht.a,
                      { href: "./login", variant: "body2", color: "inherit" },
                      "Click here to login"
                    )
                  )
                )
              )
            : r.a.createElement(
                r.a.Fragment,
                null,
                r.a.createElement(
                  "div",
                  { className: a.banner },
                  r.a.createElement(
                    w.a,
                    { variant: "h1", color: "textSecondary" },
                    "Create your new Portfolio"
                  )
                ),
                r.a.createElement(
                  "div",
                  { className: t.formContainer },
                  r.a.createElement(
                    "div",
                    { className: t.formPaper },
                    r.a.createElement(
                      ve.c,
                      {
                        initialValues: {
                          firstName: "",
                          lastName: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                        },
                        onSubmit: function (e, a) {
                          O({
                            firstName: e.firstName,
                            lastName: e.lastName,
                            email: e.email,
                            password: e.password,
                          })
                            .then(function (e) {
                              c(!0);
                            })
                            .catch(function (e) {
                              a.setFieldError("email", e.response.data),
                                a.setSubmitting(!1);
                            });
                        },
                        validationSchema: pn,
                      },
                      function (e) {
                        return r.a.createElement(
                          "form",
                          { className: t.form, onSubmit: e.handleSubmit },
                          r.a.createElement(
                            We.a,
                            { container: !0, spacing: 2 },
                            r.a.createElement(
                              We.a,
                              { item: !0, xs: 12, sm: 6 },
                              r.a.createElement(At, {
                                label: "FirstName",
                                formikProps: e,
                                formikKey: "firstName",
                                required: !0,
                                className: t.inputField,
                              })
                            ),
                            r.a.createElement(
                              We.a,
                              { item: !0, xs: 12, sm: 6 },
                              r.a.createElement(At, {
                                label: "LastName",
                                formikProps: e,
                                formikKey: "lastName",
                                required: !0,
                                className: t.inputField,
                              })
                            )
                          ),
                          r.a.createElement(At, {
                            label: "Email",
                            formikProps: e,
                            formikKey: "email",
                            required: !0,
                            className: t.inputField,
                          }),
                          r.a.createElement(At, {
                            label: "Password",
                            formikProps: e,
                            formikKey: "password",
                            type: "password",
                            required: !0,
                            className: t.inputField,
                          }),
                          r.a.createElement(At, {
                            label: "Confirm Password",
                            formikProps: e,
                            formikKey: "confirmPassword",
                            type: "password",
                            required: !0,
                            className: t.inputField,
                          }),
                          r.a.createElement(
                            S.a,
                            {
                              type: "Submit",
                              fullWidth: !0,
                              variant: "contained",
                              className: t.submit,
                              disabled: !e.isValid,
                              color: "primary",
                            },
                            r.a.createElement(w.a, null, "Sign Up")
                          ),
                          r.a.createElement(
                            We.a,
                            { container: !0 },
                            r.a.createElement(
                              We.a,
                              { item: !0, xs: !0 },
                              r.a.createElement(
                                Ht.a,
                                {
                                  href: "./login",
                                  variant: "body2",
                                  color: "textSecondary",
                                },
                                "Log In"
                              )
                            )
                          )
                        );
                      }
                    )
                  )
                )
              );
        },
        hn = function (e) {
          var a = e.globalClasses;
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement(
              "div",
              { className: a.banner },
              r.a.createElement(
                w.a,
                { variant: "h1", color: "textSecondary" },
                "Welcome to ePortfolio"
              )
            ),
            r.a.createElement(
              "div",
              { className: a.landingButtonContainer },
              r.a.createElement(
                Ht.a,
                { href: "./login", underline: "none" },
                r.a.createElement(
                  S.a,
                  {
                    type: "Submit",
                    variant: "contained",
                    className: a.landingButton,
                    color: "primary",
                  },
                  r.a.createElement(
                    w.a,
                    null,
                    "Get Started With Your portfolio"
                  )
                )
              ),
              r.a.createElement(
                Ht.a,
                { href: "./search", underline: "none" },
                r.a.createElement(
                  S.a,
                  {
                    type: "Submit",
                    variant: "contained",
                    className: a.landingButton,
                    color: "primary",
                  },
                  r.a.createElement(w.a, null, "Search for a Portfolio")
                )
              )
            )
          );
        },
        gn = t(500),
        En = t(277),
        bn = t.n(En),
        yn = Object(v.a)(function (e) {
          return {
            searchCard: {
              width: "100%",
              background: e.palette.neutral.main,
              color: e.palette.tertiary.main,
              marginTop: e.spacing(2),
              padding: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            },
            profilePicture: {
              height: "2.5em",
              width: "2.5em",
              cursor: "pointer",
            },
            bio: { marginLeft: "5%", flexGrow: 1 },
          };
        }),
        vn = function (e) {
          e.user;
          var a = yn();
          return r.a.createElement(
            Q.a,
            { className: a.searchCard },
            r.a.createElement(de.a, { className: a.profilePicture }),
            r.a.createElement(
              "div",
              { className: a.bio },
              r.a.createElement(w.a, { variant: "h3" }, "Test Search Profile"),
              r.a.createElement(w.a, null, "The Users bio will go here")
            )
          );
        },
        Nn = Object(v.a)(function (e) {
          return {
            searchContainer: { height: "50vh" },
            searchBar: {
              width: "40%",
              marginLeft: e.spacing(3),
              display: "flex",
              flexDirection: "column",
            },
            iconButton: { color: "#FFFFFF" },
            searchResults: {
              marginLeft: e.spacing(3),
              width: "50vw",
              display: "flex",
              flexDirection: "column",
            },
          };
        }),
        xn = function (e) {
          var a = e.globalClasses,
            t = Nn();
          return r.a.createElement(
            "div",
            { className: t.searchContainer },
            r.a.createElement(
              "div",
              { className: a.banner },
              r.a.createElement(
                w.a,
                { variant: "h1", color: "textSecondary" },
                "Search for Someone"
              )
            ),
            r.a.createElement(
              "div",
              { className: t.searchBar },
              r.a.createElement(Ne.a, {
                className: a.inputField,
                variant: "outlined",
                margin: "dense",
                fullWidth: !0,
                label: "Search for someone",
                InputProps: {
                  endAdornment: r.a.createElement(
                    gn.a,
                    { position: "end" },
                    r.a.createElement(
                      ge.a,
                      {
                        type: "submit",
                        className: t.iconButton,
                        "aria-label": "search",
                      },
                      r.a.createElement(bn.a, null)
                    )
                  ),
                },
              })
            ),
            r.a.createElement(
              "div",
              { className: t.searchResults },
              r.a.createElement(vn, null)
            )
          );
        },
        wn = t(481),
        Sn = Object(v.a)(function (e) {
          return {
            root: {
              height: "100vh",
              width: "100vw",
              position: "fixed",
              backgroundImage: "url(".concat(Zt.a, ")"),
              backgroundSize: "cover",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              paddingLeft: e.spacing(5),
            },
            banner: { color: e.palette.text.secondary },
            contentContainer: {},
            formContainer: { paddingLeft: e.spacing(3) },
            formPaper: {
              width: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "2em",
            },
            avatar: { height: "70px", width: "70px", background: "#FFFFFF" },
            icon: { fontSize: 40, color: e.palette.primary.main },
            inputField: {
              "& .MuiInputBase-input": { color: e.palette.text.secondary },
              "& .MuiFormLabel-root.Mui-focused": {
                color: e.palette.text.secondary,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FFFFFF" },
                "&.Mui-focused fieldset": { borderColor: "#FFFFFF" },
              },
            },
            submit: {
              color: e.palette.text.secondary,
              backgroundColor: e.palette.secondary.main,
              "&:hover": {
                backgroundColor: e.palette.secondary.light,
                borderColor: e.palette.secondary.light,
                boxShadow: "none",
              },
            },
            landingButtonContainer: {
              marginTop: e.spacing(2),
              display: "flex",
              width: "40vw",
              justifyContent: "space-around",
            },
            landingButton: {
              marginRight: e.spacing(2) + "px",
              color: e.palette.text.secondary,
              backgroundColor: e.palette.secondary.main,
              "&:hover": {
                backgroundColor: e.palette.secondary.light,
                borderColor: e.palette.secondary.light,
                boxShadow: "none",
              },
            },
            successBoard: {
              color: e.palette.text.secondary,
              width: "25%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "2%",
              "& >*": { margin: "1em" },
            },
          };
        }),
        Cn = function () {
          var e = Sn();
          return r.a.createElement(
            "div",
            { className: e.root },
            r.a.createElement(
              wn.a,
              null,
              r.a.createElement(
                d.d,
                null,
                r.a.createElement(d.b, {
                  exact: !0,
                  path: "/home/landing",
                  render: function (a) {
                    return r.a.createElement(
                      hn,
                      Object.assign({}, a, { globalClasses: e })
                    );
                  },
                }),
                r.a.createElement(d.b, {
                  exact: !0,
                  path: "/home/login",
                  render: function (a) {
                    return r.a.createElement(
                      cn,
                      Object.assign({}, a, { globalClasses: e })
                    );
                  },
                }),
                r.a.createElement(d.b, {
                  exact: !0,
                  path: "/home/signup",
                  render: function (a) {
                    return r.a.createElement(
                      fn,
                      Object.assign({}, a, { globalClasses: e })
                    );
                  },
                }),
                r.a.createElement(d.b, {
                  exact: !0,
                  path: "/home/reset",
                  render: function (a) {
                    return r.a.createElement(
                      dn,
                      Object.assign({}, a, { globalClasses: e })
                    );
                  },
                }),
                r.a.createElement(d.b, {
                  exact: !0,
                  path: "/home/search",
                  render: function (a) {
                    return r.a.createElement(
                      xn,
                      Object.assign({}, a, { globalClasses: e })
                    );
                  },
                })
              )
            )
          );
        };
      var kn = function () {
        return r.a.createElement(
          "div",
          null,
          r.a.createElement(
            i.a,
            { theme: m },
            r.a.createElement(
              c.a,
              null,
              r.a.createElement(
                u.a,
                null,
                r.a.createElement(
                  d.d,
                  null,
                  r.a.createElement(d.b, { path: "/home", component: Cn }),
                  !E() &&
                    r.a.createElement(d.b, { path: "/view", component: Yt }),
                  r.a.createElement(y, { path: "/", component: Kt })
                )
              )
            )
          )
        );
      };
      o.a.render(r.a.createElement(kn, null), document.querySelector("#root"));
    },
  },
  [[294, 1, 2]],
]);
//# sourceMappingURL=main.415ec32d.chunk.js.map
