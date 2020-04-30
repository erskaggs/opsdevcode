import React from "react";
import SectionTitle from "./sectiontitle";
import { StaticQuery, graphql } from "gatsby";
import { Mapmarker, Envelope } from "./icons";
import SocialLinks from "./sociallinks";
import "../style/contact.less";

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitDisabled: false
        };

        this.textAreaInput = this.textAreaInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.showContactForm = true;

        if (this.props.contact.api_url === "") {
            this.showContactForm = false;
        }
    }

    textAreaInput(event) {
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + "px";
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.submitDisabled) {
            this.setState({
                submitDisabled: true
            });

            let name = encodeURI(this.dataName.value),
                email = encodeURI(this.dataEmail.value),
                message = encodeURI(this.dataMessage.value),
                body = `name=${name}&email=${email}&message=${message}`;

            fetch(this.props.contact.api_url, {
                method: "post",
                body: body
            })
                .then(function(res) {
                    return res.json();
                })
                .then(
                    result => {
                        this.setState({
                            submitDisabled: false
                        });
                        this.resMessage.style.opacity = 1;
                        if (result.response === "error") {
                            this.resMessage.innerHTML =
                                "There was an error in sending the message";
                            this.resMessage.classList.add("color-error");
                        } else {
                            this.resMessage.innerHTML =
                                "Message sent succesfully";
                            this.resMessage.classList.remove("color-error");
                        }
                        this.dataName.value = "";
                        this.dataEmail.value = "";
                        this.dataMessage.value = "";
                        let _this = this;
                        setTimeout(function() {
                            _this.resMessage.style.opacity = 0;
                        }, 5000);
                    },
                    error => {
                        this.resMessage.innerHTML = "Message sent succesfully";
                        this.resMessage.classList.remove("color-error");
                        this.setState({
                            submitDisabled: false
                        });
                        let _this = this;
                        setTimeout(function() {
                            _this.resMessage.style.opacity = 0;
                        }, 5000);
                    }
                );
        }
    }

    componentDidMount() {
        if (this.showContactForm) {
            let color = window
                .getComputedStyle(this.btn, null)
                .getPropertyValue("color");
            this.btn.querySelector("path").setAttribute("fill", color);
        }

        let li = this.contactArea.querySelectorAll(".item");

        li.forEach(function(e, i) {
            let p = e.querySelector("path");
            if (p)
                p.setAttribute(
                    "fill",
                    window.getComputedStyle(e, null).getPropertyValue("color")
                );
        });
    }

    render() {
        return (
            <section id="contact" className="container">
                <div className="section-title">
                    <SectionTitle title="Contact Info"/>
                </div>
                <div
                    className={"row" + (this.showContactForm ? "" : " no-form")}
                    ref={c => (this.contactArea = c)}
                >

                    <div
                        className={
                            this.showContactForm
                                ? "col s12 m6 details"
                                : "col s12 details"
                        }
                    >
                        <ul>
                            {this.props.contact.mail && (
                                <li className="text-secondary item">
                                    <span className="icon">
                                        <Envelope />
                                    </span>
                                    <a
                                        href={
                                            "mailto:" + this.props.contact.mail
                                        }
                                    >
                                        {this.props.contact.mail}
                                    </a>
                                </li>
                            )}
                            {this.props.contact.address && (
                                <li
                                    className="text-tertiary item"
                                    style={{ whiteSpace: "pre" }}
                                >
                                    <span className="icon">
                                        <Mapmarker />
                                    </span>
                                    {this.props.contact.address}
                                </li>
                            )}
                            <li>
                                <SocialLinks />
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default () => (
    <StaticQuery
        query={graphql`
            query {
                site {
                    siteMetadata {
                        contact {
                            api_url
                            description
                            mail
                            phone
                            address
                        }
                    }
                }
            }
        `}
        render={data => <Contact contact={data.site.siteMetadata.contact} />}
    />
);
