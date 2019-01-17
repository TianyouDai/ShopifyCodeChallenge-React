import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

function Title(props) {
  return (
    <h1 className="title-area">
      {props.name}
    </h1>
  );
}

function Datalist(props) {

    let lst = [];
    let dup = {}
    let k = 0
    for (let item of props.data) {
        for (let word of item.keywords) {

            // remove duplicates
            if (word in dup) continue;
            dup[word] = true;
            
            lst.push(<option value={word} key={k}/>)
            k += 1
        }
    }

    return (
      <datalist id="keywords">
        {lst}
      </datalist>
    );
}

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ""
      };
    }

    handelChange(val) {
        // if user clears the search field, trigger a search
        this.setState({value: val});
        if (val === "") this.props.onSearch("");
    }

    render() {
        return (
            <div className="search-area">
                <SearchField
                    onSearch={() => this.props.onSearch(this.state.value)}
                    onModify={(val) => this.handelChange(val)}
                />
                <SearchBox
                    onSearch={() => this.props.onSearch(this.state.value)}
                />
            </div>
        );
    }
}

class SearchField extends React.Component {
    handelKeypress(e) {
        // if the keypress is enter then trigger a search
        if (e.keyCode === 13) this.props.onSearch();
        this.props.onModify(e.target.value)
    }

    render() {
        return (
            <input
                className="search-field"
                type="text"
                name="query"
                list="keywords"
                onKeyUp={(e) => this.handelKeypress(e)}
            />
        );
    }
}

class SearchBox extends React.Component {
    render() {
        return (
            <div className="search-box-area">
                <div
                    className="search-box"
                    onClick={() => this.props.onSearch()}
                >
                    <i className="fas fa-search fa-2x"></i>
                </div>
            </div>
        );
    }
}

class Results extends React.Component {
    render() {

        const res = this.props.res
        const fav_lst = this.props.fav.map(x => x.uid)

        const results = res.map((item) => {

            const starClass = (fav_lst.includes(item.uid))? "fas fa-star fav" : "fas fa-star";
            const uid_key = item.uid

            return (
                <div className="result-row" key={uid_key}>
                    <i className={starClass} onClick={() => this.props.onClick(item.uid)} key={uid_key + "0"}></i>
                    <div className="result-title" key={uid_key + "1"}>{item.title}</div>
                    <div
                        className="result-body"
                        key={uid_key + "2"}
                        dangerouslySetInnerHTML={{__html: item.body}}>
                    </div>
                </div>
            );
        });

        return (
            <div className="result-area">
                {results}
            </div>
        );
    }
}

class Fav extends React.Component {
    render() {
        const fav = this.props.fav

        // don't render if no favourites
        if (fav.length <= 0) return (<div></div>);

        const results = fav.map((item) => {

            const uid_key = item.uid + "fav"

            return (
                <div className="result-row" key={uid_key}>
                    <i className="fas fa-star fav" onClick={() => this.props.onClick(item.uid)} key={uid_key + "0"}></i>
                    <div className="result-title" key={uid_key + "1"}>{item.title}</div>
                    <div
                        className="result-body"
                        key={uid_key + "2"}
                        dangerouslySetInnerHTML={{__html: item.body}}>
                    </div>
                </div>
            );
        });

        return (
            <div className="favourite-area">
                <h2 className="favourite-title">Favourites</h2>
                <div className="favourite-result-area">
                    {results}
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data:    [], // the data from the API (retrived once per page load)
        results: [], // the results from the last search
        fav:     []  // the currently favourited objects
      };
    }

    componentDidMount() {
        axios.get("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000").then(response => {

            for (let item of response.data) {
                item.body = decodeHtml(item.body)

                // assuming that title is a unique identifier for a given object
                item.uid = btoa(item.title)

                // seperate out keywords
                let kw_list = item.keywords.replace("(", "").replace(")", "").split(", ")
                let keywords = kw_list.map(x => x.split(" ")).flat().filter(x => x !== "")
                item.keywords = keywords

                let keyDict = {}
                for (let word of keywords) keyDict[word] = true
                item.keywordsDict = keyDict
            }

            let objectDict = {}
            for (let obj of response.data) {
                objectDict[obj.uid] = obj
            }

            axios.get("https://0rl0n06sj6.execute-api.us-east-1.amazonaws.com/default/getFavourites").then(response => {
                // get favourites
                let fav = response.data.map(x => x.uid)

                let fav_lst  = []
                let data_lst = []

                for (let uid in objectDict) {
                    data_lst.push(objectDict[uid])
                    if (fav.includes(uid)) fav_lst.push(objectDict[uid])
                }

                this.setState({data: data_lst, fav: fav_lst})
            })
        })
    }

    // helper function for searching data
    // words:   list of words to return results for
    // returns: list of object that match the words
    searchData(words) {

        let results = []
        for (let item of this.state.data) {

            let found = false
            for (let word of words) {

                if (word in item.keywordsDict) {

                    results.push(item)
                    found = true
                    break;

                }
            }

            if (found) continue;
        }
        return results;
    }

    searchHandeler(terms) {
        terms = terms.split(" ")
        let new_results = this.searchData(terms)
        this.setState({results: new_results})
    }

    // a star is clicked
    clickHandeler(uid) {

        const fav = this.state.fav.map(x => x.uid)
        const status = (fav.includes(uid)) ? false : true

        const url    = "https://0rl0n06sj6.execute-api.us-east-1.amazonaws.com/default/setFavorite?";
        const params = `uid=${uid}&status=${status}`;

        axios.get(url + params).then(response => {
            axios.get("https://0rl0n06sj6.execute-api.us-east-1.amazonaws.com/default/getFavourites").then(favourites => {

                // the current favourites
                let fav = favourites.data.map(x => x.uid)

                // new favourites and data
                let fav_lst = []
                for (let item of this.state.data) {
                    if (fav.includes(item.uid)) fav_lst.push(item)
                }

                // including results to trigger re-render
                this.setState({fav: fav_lst})
            })
        })
    }

    render() {
        return (
            <div className="container">
                <Title name="Toronto Waste Lookup" />
                <div className="content-area">
                    <Search onSearch={(terms) => this.searchHandeler(terms)} />
                    <Results onClick={(uid) => this.clickHandeler(uid)} res={this.state.results} fav={this.state.fav}/>
                    <Fav onClick={(uid) => this.clickHandeler(uid)} fav={this.state.fav} />
                </div>
                <Datalist data={this.state.data} />
            </div>
        );
    }
}

// Helper functions

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
