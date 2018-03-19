import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { fetchArticleData, makeArticle } from '../store/singleArticle'
import { ArticleAnalyzer, KeywordBox, RadarChart } from '../components'
import KeywordBoxWProps from './keywordBoxWProps'
import RadarChartWProps from './radarChartWProps'
import history from '../history';
import ReactLoading from 'react-loading';

class singleArticleData extends Component {
    constructor(props) {
        super(props)
    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    render() {
        console.log(this.props.singleArticle.info)
        if (Object.keys(this.props.singleArticle).length === 0) {
            return (
                <div>
                    <div>
                        <ArticleAnalyzer />
                    </div>
                    <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
                </div>
            )
        } else {
            //singleArticleData={this.props.singleArticle.tone.document_tone.tone_categories} 
            return (
                <div>
                    <div>
                        <ArticleAnalyzer />
                    </div>
                    <div>Title: {this.props.singleArticle.info.headline}
                        <KeywordBoxWProps singleArticle={this.props.singleArticle.emotion} />
                        <RadarChartWProps />
                    </div>
                </div>
            )
        }
    }
}




const mapState = ({ singleArticle }) => ({ singleArticle })
const mapDispatch = (dispatch, ownProps) => {
    return {
        loadData(url) {
            dispatch(fetchArticleData(url))
        }
    }
}

export default connect(mapState, mapDispatch)(singleArticleData)