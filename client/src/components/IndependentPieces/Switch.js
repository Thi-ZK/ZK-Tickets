function Switch ( props ) {
    const condition = props.currentDisplayedContent;
    const children = props.children;

    let selected_case = children.filter((elem) => {
        return elem.props.switch_case === condition;
    });

    return selected_case;
}

export default Switch;