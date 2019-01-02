import React from 'react';
import { connect } from 'react-redux';


export class WelcomeMessage extends React.Component {
    state = {
        msgDismissed: false
    }
    constructor(props) {
        super(props);
    }
    onClickHandle = () => {
            this.setState(prevState=>({
                msgDismissed: !prevState.msgDismissed
            }));
    }

    componentDidMount() {
        const json = localStorage.getItem('dismissed');
        const msgDismissed = JSON.parse(json);
        this.setState(() => ({msgDismissed}));
    }

    componentDidUpdate() {
        if(this.state.msgDismissed) {
            const msg = JSON.stringify(this.state.msgDismissed);
            localStorage.setItem('dismissed', msg);
        }
    }
    render() {
        const startDate = this.props.filters.startDate ? this.props.filters.startDate.format('DD-MMM-YYYY') : undefined;
        const endDate = this.props.filters.endDate ? this.props.filters.endDate.format('DD-MMM-YYYY') : undefined;
        const userName = this.props.userName;
        return (
            <div className="content-container">
            <h1 className="welcome__username">Hello there, <span>{userName.displayName}</span>!</h1>
            {!this.state.msgDismissed &&
                <div className="welcome">
                <span id="close-msg" onClick={this.onClickHandle}>x [dismiss message]</span>
                <p>
                By default, shown expenses are those between the start and the end
                of the current month. You can change the date range below.
                Or you can clear the date range to view a list of all your expenses
                by clicking the X button on the date range filter.
                </p>
                </div>
            }
            {startDate && endDate ? 
                (<p>
                    Currently showing your expenses from {startDate} to {endDate}
                </p>) 
                :
                (<p>Currently showing all expenses. You can set a date range to narrow the search.</p>)}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    filters: state.filters
})

export default connect(mapStateToProps)(WelcomeMessage);