/* eslint-disable no-unused-vars */
/**
=========================================================
* Operational Workflow Management MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Operational Workflow Management MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout1";
import DashboardNavbar from "examples/Navbars/NavbarJunior";
import Footer from "examples/Footer";

// Operational Workflow Management MUI base styles
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';

import ArgonBox from "components/ArgonBox";
import "react-step-progress-bar/styles.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const steps = [
  {
    status: "Junior"
  },
  {
    status: "Team Leader"
  },
  {
    status: "Project manager"
  },
  {
    status: "HR"
  }
];
function Default() {

  const [leaveData, setLeaveData] = useState([])
  const [proData, setProData] = useState([])

  useEffect(() => {
    axios.get(ipofserver + 'loadStatuslst/' + localStorage.getItem('LoginUsername'))
      .then(res => {
        // alert(res.data[0])
        // alert(res.data[1])
        var statuslst = []
        var statuslst1 = []
        res.data[1].map((i) => {
          statuslst.push(i[2])
        })        
        res.data[0].map((i) => {
          statuslst1.push(i[2])
        })
        
        // alert(statuslst)
        // alert(statuslst1)
        if (statuslst.includes('Team Leader')) {
          if (statuslst.includes('Project manager')) {
            if (statuslst.includes('HR')) {
              setLeaveData('HR')
            }
            else {
              setLeaveData('Project manager')
            }

          }
          else {
            setLeaveData('Team Leader')
          }
        }
        else {
          setLeaveData('Junior')
        }

        if (statuslst1.includes('Team Leader')) {
          if (statuslst1.includes('Project manager')) {
            if (statuslst1.includes('HR')) {
              setProData('HR')
            }
            else {
              setProData('Project manager')
            }

          }
          else {
            setProData('Team Leader')
          }
        }
        else {
          setProData('Junior')
        }
        // setLeaveData(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const transfer = {
    status: leaveData // change transfer status to progress bar
  };

  const transfer1 = {
    status: proData // change transfer status to progress bar
  };

  const getStepPosition = (transferStatus) => {
    return steps.findIndex(({ status }) => status === transferStatus) + 1;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
        <ArgonBox p={3} mt={5} mb={5} style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
          <div className="d-flex justify-content-between">
            <h4 className='mb-3'>Leave status</h4>
          </div>
          <div style={{ marginTop: 50, marginLeft: 50, marginRight: 50, marginBottom: 70 }}>
            <ProgressBar
              width={1000}
              height={18}
              percent={100 * (getStepPosition(transfer.status) / steps.length)}
              filledBackground="dodgerblue">
              {steps.map((step, index, arr) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        marginTop: 55,
                        width: 50,
                        height: 50,
                        color: "black",
                        backgroundColor: "lightgray"
                        // backgroundColor: accom ? "dodgerblue" : "lightgray"
                      }}>
                      {index + 1}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                        width: 50,
                        height: 50,
                        color: "black",
                      }}>
                      {step.status}
                    </div>
                  </div>
                );
              })}
            </ProgressBar>
          </div>
        </ArgonBox>
        <ArgonBox p={3} mt={5} mb={5} style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
          <div className="d-flex justify-content-between">
            <h4 className='mb-3'>Promotion status {proData}</h4>
          </div>
          <div style={{ marginTop: 50, marginLeft: 50, marginRight: 50, marginBottom: 70 }}>
            <ProgressBar
              width={1000}
              height={18}
              percent={100 * (getStepPosition(transfer1.status) / steps.length)}
              filledBackground="dodgerblue">
              {steps.map((step, index, arr) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        marginTop: 55,
                        width: 50,
                        height: 50,
                        color: "black",
                        backgroundColor: "lightgray"
                        // backgroundColor: accom ? "dodgerblue" : "lightgray"
                      }}>
                      {index + 1}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                        width: 50,
                        height: 50,
                        color: "black",
                      }}>
                      {step.status}
                    </div>
                  </div>
                );
              })}
            </ProgressBar>
          </div>
        </ArgonBox>
        {/* <ArgonBox p={3} mt={5} mb={5} style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
          <div className="d-flex justify-content-between">
            <h2 className='mb-3'>{"Status : " + transfer.status}</h2>
          </div>
          <div style={{ marginTop: 50, marginLeft: 50, marginRight: 50, marginBottom: 70 }}>
            <ProgressBar
              width={1000}
              height={18}
              percent={100 * (getStepPosition(transfer.status) / steps.length)}
              filledBackground="dodgerblue">
              {steps.map((step, index, arr) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        marginTop: 55,
                        width: 50,
                        height: 50,
                        color: "black",
                        backgroundColor: "lightgray"
                        // backgroundColor: accom ? "dodgerblue" : "lightgray"
                      }}>
                      {index + 1}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                        width: 50,
                        height: 50,
                        color: "black",
                      }}>
                      {step.status}
                    </div>
                  </div>
                );
              })}
            </ProgressBar>
          </div>
        </ArgonBox> */}
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
