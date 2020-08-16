import React from "react";
import classes from "./Spinner3.css";
const spinner =()=>
{
    return(
        <div className={classes.loader1}>
            <div className={classes.spinner1}>
                <div className={classes.container}>
                    <div className={classes.hex0}></div>
                    <div className={classes.hex120}></div>
                    <div className={classes.hex240}></div>
                    <div className={classes.spinner1}>
                        <div className={classes.container}>
                            <div className={classes.hex0}></div>
                            <div className={classes.hex120}></div>
                            <div className={classes.hex240}></div>
                            <div className={classes.spinner1}>
                                <div className={classes.container}>
                                    <div className={classes.hex0}></div>
                                    <div className={classes.hex120}></div>
                                    <div className={classes.hex240}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default spinner;