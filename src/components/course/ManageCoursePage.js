import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {}
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    // Called anytime props will change
    componentWillReceiveProps(nextProps) {
        if(this.props.course.id != nextProps.course.id) {
            // Necessary to populate from when existing course is loaded directly
            this.setState({
                course: Object.assign({}, nextProps.course)
            });
        }
    }

    updateCourseState(event) {
        const { name, value } = event.target;
        let course = Object.assign({}, this.state.course);
        course[name] = value;
        return this.setState({course: course});
    }

    saveCourse(event) {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }

    render() {
        return (
            <CourseForm
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                allAuthors={this.props.authors}
                course={this.state.course}
                errors={this.state.errors}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if(course.length) return course[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; // from the path /course/id
    let course = {
        id: '',
        watchRef: '',
        title: '',
        authorId: '',
        length: '',
        category: ''
    };

    // We need to wait for the courses to be loaded
    if(courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }
    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: `${author.firstName} ${author.lastName}`
        };
    });
    return {
        course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);