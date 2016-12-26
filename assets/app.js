class App extends React.Component {
    buildApp = (lang) => {
        fadeOut("#language", 1000, function() {
            ReactDOM.render(<Main locale={lang}/>,document.body);
        });
    }

    render () {
        var langStyle = {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
        }

        return (
            <div id="language" style={langStyle}>
                <img src="img/pt.png" onClick={() => {this.buildApp("pt")}}></img>
                <img src="img/en.png" onClick={() => {this.buildApp("en")}}></img>
            </div>
        )
    }
}

class Main extends React.Component {
    render() {
        return(
            <div id="main-container" style={{width: 700, margin: "auto"}}>
                <Sidebar />
                {text.map((item, index) => {
                    if(index === 0) return <Open locale={this.props.locale}/>;
                    else return <Song locale={this.props.locale} id={index} key={index} song={item}/>
                })}
            </div>
        )
    }
}

class Sidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    openMenu = () => {
        this.setState({
            open: !this.state.open
        });
    }


    render() {
        var containerStyle = {
            //borderStyle: 'solid',
            position: "fixed",
            right: "1em",
            top: "1em",
            pointerEvents: this.state.open ? "auto" : "none"
        };
        var iconStyle = {
            position: "absolute",
            right: "0px",
            fontSize: "30px",
            padding: "5px 8px",
            border: "2px solid",
            borderRadius: "5px",
            borderColor: "grey",
            color: "grey",
            backgroundColor: "white",
            pointerEvents: "auto"
        };
        var listStyle = {
            listStylePosition: "inside",
            listStyleType: "none",
            border: "2px solid",
            borderRadius: "5px",
            borderColor: "grey",
            color: "grey",
            margin: "48px 0 0 0",
            padding: "0.5em 1em",
            backgroundColor: "white",
            opacity: this.state.open ? 1 : 0,
            //pointerEvents: this.state.open ? "auto" : "none",
            transition: "all 0.2s linear",
        }

        return (
            <div style={containerStyle}>
                <i className="fa fa-bars grey" style={iconStyle} onClick={this.openMenu}></i>
                <li style={listStyle}>
                {text.map((item, index) => {
                    return <ul className="menuItem"><a className="menuLink" href={"#"+item.name} onClick={this.openMenu}>{item.name}</a></ul>
                })}
                </li>

            </div>
        );
    }
}

class Open extends React.Component {
    render() {
        return (
            <header>
                <a name="Prefácio"></a>
                <img src="img/Aurora.jpg" id="mainCover" />
                <p className="preface">
                    {text[0][this.props.locale]}
                </p>
            </header>
        );
    }
}

class Song extends React.Component {
    render() {
        return (
            <div>
                <a name={this.props.song.name}></a>
                <Header locale={this.props.locale} id={this.props.id} name={this.props.song.name}/>
                <br />
                <About />
            </div>
        );
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.imgsize = 350;
        this.font = 2; // em
        this.text = text[this.props.id];
        this.toActivate = true;
    }

    localeLabel = (pt, en) => {
        return (this.props.locale === "pt" ? pt : en)
    }

    animate = () => {
        imgpush(1000,this.imgsize,this.font,this.props.id);
    }

    render() {
        var headerBorderStyle = {
            //borderStyle: 'solid', //Temporário!
            height: this.imgsize,
        }
        var songAboutStyle = {
            width: this.imgsize,
            height: this.imgsize,
            //backgroundColor: "red",
            marginLeft: (700/2-this.imgsize/2)
        }

        return (
            <div onMouseEnter={() => {
                if(this.toActivate)
                    this.animate();
                    this.toActivate = false;
            }}
            className={"headerBorder id"+this.props.id}
            style={headerBorderStyle}>
                <div className={"songAbout id" +this.props.id} style={songAboutStyle}>
                    <img src={"img/"+this.text.name+".jpg"}
                    ref="cover"/>

                    <SongData id={this.props.id}
                    text={this.localeLabel("Título","Title")}
                    about={this.text.name}
                    font={this.font}/>

                    <SongData id={this.props.id}
                    text={this.localeLabel("Data","Date")}
                    about={this.text.date}
                    font={this.font}/>

                    <SongData id={this.props.id}
                    text={this.localeLabel("Codinome","Codename")}
                    about={this.text.codename ? this.text.codename : this.text.name}
                    font={this.font}/>
                </div>
            </div>
        );
    }
}

class SongData extends React.Component {

    render() {
        return (
            <p className={"infoTitle id"+this.props.id}>
                <p className={"title"} style={{fontSize: this.props.font+"em"}}>
                    {this.props.text}
                    <hr />
                </p>
                <span className={"infoData id"+this.props.id} style={{fontSize: this.props.font+"em"}}>
                    {this.props.about}
                </span>
            </p>
        );
    }
}

class About extends React.Component {
    render() {
        return (
            <p className="songBody">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        );
    }
}

ReactDOM.render(<App />,document.body);
