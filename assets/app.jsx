// Abre as opções de linguagem e é responsável por carregar o que vem a seguir.
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
                <img className="flag" src="img/pt.png" onClick={() => {this.buildApp("pt")}}></img>
                <img className="flag" src="img/en.png" onClick={() => {this.buildApp("en")}}></img>
            </div>
        )
    }
}

// A página em si, dependente da linguagem escolhida.
class Main extends React.Component {
    componentDidMount() {
        fadeIn("#main-container",800);
    }

    render() {
        return(
            <div id="main-container" style={{opacity:0, width: 700, left: "50%", margin: "auto"}}>
                <Sidebar locale={this.props.locale} />
                <Open locale={this.props.locale}/>
                {text.map((item, index) => {
                    return <Song locale={this.props.locale} id={index} key={index} song={item}/>
                })}
                <Footer locale={this.props.locale} />
            </div>
        )
    }
}

// Ícone e dropdown para pular de música.
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
                    <ul className="menuItem"><a className="menuLink" href={"#Start"} onClick={this.openMenu}>
                        {this.props.locale === "pt" ? "Início" : "Home"}
                    </a></ul>
                    <ul className="menuItem"><a className="menuLink" href={"#Prefácio"} onClick={this.openMenu}>
                        {this.props.locale === "pt" ? "Prefácio" : "Foreword"}
                    </a></ul>
                    {text.map((item, index) => {
                        return <ul className="menuItem"><a className="menuLink" href={"#"+item.name} onClick={this.openMenu}>{item.name}</a></ul>
                    })}
                    <ul className="menuItem"><a className="menuLink" href={"#Final"} onClick={this.openMenu}>
                        {this.props.locale === "pt" ? "Palavras Finais" : "Closing Words"}
                    </a></ul>
                </li>

            </div>
        );
    }
}

// Abertura da página, inclui a capa, a introdução e o prefácio
class Open extends React.Component {
    render() {
        return (
            <header>
                <a name="Start"></a>
                <img src="img/Anilin.jpg" className="mainImg" />
                <p className="bodyText" dangerouslySetInnerHTML={{__html: intro[0][this.props.locale]}}>
                </p>
                <a name="Prefácio"></a>
                <h1 style={{fontFamily: "title"}}>{this.props.locale === "pt" ? "Prefácio" : "Foreword"}</h1>
                <p className="bodyText" dangerouslySetInnerHTML={{__html: intro[1][this.props.locale]}}>
                </p>
            </header>
        );
    }
}

// Container do conteúdo de cada música
class Song extends React.Component {
    render() {
        return (
            <div>
                <a name={this.props.song.name}></a>
                <Header locale={this.props.locale} id={this.props.id} name={this.props.song.name}/>
                <br />
                <About text={this.props.locale === "pt" ? this.props.song.pt : this.props.song.en}/>
            </div>
        );
    }
}

// Caixa interativa com a arte da música e os dados
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
                    ref="cover" style={{backgroundColor: "white"}}/>

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

// Dados da caixa
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

// Dados da música após a caixa interativa
class About extends React.Component {
    render() {
        return (
            <p className="bodyText" dangerouslySetInnerHTML={{__html: this.props.text}}>
            </p>
        );
    }
}

// Fim do documento
class Footer extends React.Component {
    render () {
        return (
            <div>
                <a name="Final"></a>
                <h1 style={{fontFamily: "title"}}>{this.props.locale === "pt" ? "Palavras finais" : "Closing Words"}</h1>
                <p className="bodyText" dangerouslySetInnerHTML={{__html: outro[this.props.locale]}}>
                </p>
                <img src="img/no2c6h4nh2.png" className="mainImg" />
            </div>

        )
    }
}


ReactDOM.render(<App />,document.body);
