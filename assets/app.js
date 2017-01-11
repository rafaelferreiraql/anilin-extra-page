// Abre as opções de linguagem e é responsável por carregar o que vem a seguir.
class App extends React.Component {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.buildApp = lang => {
            fadeOut("#language", 1000, function () {
                ReactDOM.render(React.createElement(Main, { locale: lang }), document.body);
            });
        }, _temp;
    }

    render() {
        var langStyle = {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
        };

        return React.createElement(
            "div",
            { id: "language", style: langStyle },
            React.createElement("img", { className: "flag", src: "img/pt.png", onClick: () => {
                    this.buildApp("pt");
                } }),
            React.createElement("img", { className: "flag", src: "img/en.png", onClick: () => {
                    this.buildApp("en");
                } })
        );
    }
}

// A página em si, dependente da linguagem escolhida.
class Main extends React.Component {
    componentDidMount() {
        fadeIn("#main-container", 800);
    }

    render() {
        return React.createElement(
            "div",
            { id: "main-container", style: { opacity: 0, width: 700, left: "50%", margin: "auto" } },
            React.createElement(Sidebar, { locale: this.props.locale }),
            React.createElement(Open, { locale: this.props.locale }),
            text.map((item, index) => {
                return React.createElement(Song, { locale: this.props.locale, id: index, key: index, song: item });
            }),
            React.createElement(Footer, { locale: this.props.locale })
        );
    }
}

// Ícone e dropdown para pular de música.
class Sidebar extends React.Component {
    constructor() {
        super();

        this.openMenu = () => {
            this.setState({
                open: !this.state.open
            });
        };

        this.state = {
            open: false
        };
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
            transition: "all 0.2s linear"
        };

        return React.createElement(
            "div",
            { style: containerStyle },
            React.createElement("i", { className: "fa fa-bars grey", style: iconStyle, onClick: this.openMenu }),
            React.createElement(
                "li",
                { style: listStyle },
                React.createElement(
                    "ul",
                    { className: "menuItem" },
                    React.createElement(
                        "a",
                        { className: "menuLink", href: "#Start", onClick: this.openMenu },
                        this.props.locale === "pt" ? "Início" : "Home"
                    )
                ),
                React.createElement(
                    "ul",
                    { className: "menuItem" },
                    React.createElement(
                        "a",
                        { className: "menuLink", href: "#Prefácio", onClick: this.openMenu },
                        this.props.locale === "pt" ? "Prefácio" : "Foreword"
                    )
                ),
                text.map((item, index) => {
                    return React.createElement(
                        "ul",
                        { className: "menuItem" },
                        React.createElement(
                            "a",
                            { className: "menuLink", href: "#" + item.name, onClick: this.openMenu },
                            item.name
                        )
                    );
                }),
                React.createElement(
                    "ul",
                    { className: "menuItem" },
                    React.createElement(
                        "a",
                        { className: "menuLink", href: "#Final", onClick: this.openMenu },
                        this.props.locale === "pt" ? "Palavras Finais" : "Closing Words"
                    )
                )
            )
        );
    }
}

// Abertura da página, inclui a capa, a introdução e o prefácio
class Open extends React.Component {
    render() {
        return React.createElement(
            "header",
            null,
            React.createElement("a", { name: "Start" }),
            React.createElement("img", { src: "img/Anilin.jpg", className: "mainImg" }),
            React.createElement("p", { className: "bodyText", dangerouslySetInnerHTML: { __html: intro[0][this.props.locale] } }),
            React.createElement("a", { name: "Pref\xE1cio" }),
            React.createElement(
                "h1",
                { style: { fontFamily: "title" } },
                this.props.locale === "pt" ? "Prefácio" : "Foreword"
            ),
            React.createElement("p", { className: "bodyText", dangerouslySetInnerHTML: { __html: intro[1][this.props.locale] } })
        );
    }
}

// Container do conteúdo de cada música
class Song extends React.Component {
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("a", { name: this.props.song.name }),
            React.createElement(Header, { locale: this.props.locale, id: this.props.id, name: this.props.song.name }),
            React.createElement("br", null),
            React.createElement(About, { text: this.props.locale === "pt" ? this.props.song.pt : this.props.song.en })
        );
    }
}

// Caixa interativa com a arte da música e os dados
class Header extends React.Component {
    constructor(props) {
        super(props);

        this.localeLabel = (pt, en) => {
            return this.props.locale === "pt" ? pt : en;
        };

        this.animate = () => {
            imgpush(1000, this.imgsize, this.font, this.props.id);
        };

        this.imgsize = 350;
        this.font = 2; // em
        this.text = text[this.props.id];
        this.toActivate = true;
    }

    render() {
        var headerBorderStyle = {
            //borderStyle: 'solid', //Temporário!
            height: this.imgsize
        };
        var songAboutStyle = {
            width: this.imgsize,
            height: this.imgsize,
            //backgroundColor: "red",
            marginLeft: 700 / 2 - this.imgsize / 2
        };

        return React.createElement(
            "div",
            { onMouseEnter: () => {
                    if (this.toActivate) this.animate();
                    this.toActivate = false;
                },
                className: "headerBorder id" + this.props.id,
                style: headerBorderStyle },
            React.createElement(
                "div",
                { className: "songAbout id" + this.props.id, style: songAboutStyle },
                React.createElement("img", { src: "img/" + this.text.name + ".jpg",
                    ref: "cover", style: { backgroundColor: "white" } }),
                React.createElement(SongData, { id: this.props.id,
                    text: this.localeLabel("Título", "Title"),
                    about: this.text.name,
                    font: this.font }),
                React.createElement(SongData, { id: this.props.id,
                    text: this.localeLabel("Data", "Date"),
                    about: this.text.date,
                    font: this.font }),
                React.createElement(SongData, { id: this.props.id,
                    text: this.localeLabel("Codinome", "Codename"),
                    about: this.text.codename ? this.text.codename : this.text.name,
                    font: this.font })
            )
        );
    }
}

// Dados da caixa
class SongData extends React.Component {

    render() {
        return React.createElement(
            "p",
            { className: "infoTitle id" + this.props.id },
            React.createElement(
                "p",
                { className: "title", style: { fontSize: this.props.font + "em" } },
                this.props.text,
                React.createElement("hr", null)
            ),
            React.createElement(
                "span",
                { className: "infoData id" + this.props.id, style: { fontSize: this.props.font + "em" } },
                this.props.about
            )
        );
    }
}

// Dados da música após a caixa interativa
class About extends React.Component {
    render() {
        return React.createElement("p", { className: "bodyText", dangerouslySetInnerHTML: { __html: this.props.text } });
    }
}

// Fim do documento
class Footer extends React.Component {
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("a", { name: "Final" }),
            React.createElement(
                "h1",
                { style: { fontFamily: "title" } },
                this.props.locale === "pt" ? "Palavras finais" : "Closing Words"
            ),
            React.createElement("p", { className: "bodyText", dangerouslySetInnerHTML: { __html: outro[this.props.locale] } }),
            React.createElement("img", { src: "img/no2c6h4nh2.png", className: "mainImg" })
        );
    }
}

ReactDOM.render(React.createElement(App, null), document.body);
