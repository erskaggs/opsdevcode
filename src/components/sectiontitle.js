import React from "react";
import { graphql } from "gatsby";
import "../style/title.less"

class SectionTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winHeight: "100vh"
        };
    }

    createSVGElement(n,v) {
        n = document.createElementNS("http://www.w3.org/2000/svg", n);
        for (var p in v) n.setAttributeNS(null, p, v[p]);
        return n;
    }

    setWindowHeight() {
        this.setState({
            winHeight: window.innerHeight
        });
    }

    componentDidMount() {
        this.setWindowHeight();

        window.addEventListener("resize", this.setWindowHeight);

        let sWidth = this.svg.clientWidth,
            tText = this.svg.querySelector("text"),
            tWidth = tText.getBoundingClientRect().width;

        if (tWidth > sWidth) {
            let tInnerText = tText.innerHTML;
            if (tInnerText.split(" ").length > 1) {
                tText.innerHTML = "";
                tInnerText.split(" ").forEach((e, i) => {
                    let tSpan = this.createSVGElement("tspan", {
                        dy: i === 0 ? "0em" : ".8em",
                        x: "50"
                    });
                    tSpan.innerHTML = e;
                    tText.appendChild(tSpan);

                });
                setTimeout(() => {
                   this.svg.style.height =
                        tText.getBoundingClientRect().height + 70;
                    this.svg.style.margin = "15px auto"
                }, 250);

            } else {
                while (tWidth > sWidth) {
                    let fontSize = parseInt(
                        window
                            .getComputedStyle(tText, null)
                            .getPropertyValue("font-size")
                    );
                    tText.style.fontSize = fontSize - 1 + "px";
                    tWidth = tText.getBoundingClientRect().width;
                }
            }
        }
    }
    render() {
        return (
            <div
                className="titlewall"
                style={{ height: "200"}}
            >
                <div className="title container">
                    <div className="section-title">
                        <svg
                            width="100%"
                            height="100px"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid slice"
                            ref={c => (this.svg = c)}
                        >
                            <pattern
                                id="wallPattern"
                                patternUnits="userSpaceOnUse"
                                width="100"
                                height="100"
                            >
                                <rect
                                    x="0"
                                    y="0"
                                    className="fill-primary"
                                    width="100"
                                    height="100"
                                />
                                <image
                                    xlinkHref="/images/wall.jpg"
                                    height="100"
                                    width="100"
                                    y="0"
                                    preserveAspectRation="none"
                                ></image>
                            </pattern>
                            <text
                                fill="url(#wallPattern)"
                                textAnchor="middle"
                                x="50"
                                y="52"
                            >
                                {this.props.title}
                            </text>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

export default SectionTitle;

export const query = graphql`
    query {
        site {
            siteMetadata {
                titleImage
            }
        }
    }
`;