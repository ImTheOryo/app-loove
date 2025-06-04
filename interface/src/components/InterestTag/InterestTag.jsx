import "./InterestTag.css";

function InterestTag({hobby, selected, clickable, hobby_id}) {



    return (
        <div className={`interest-tag ${selected ? 'selected' : ''}`} data-id={hobby_id} onClick={clickable}>
            {hobby}
        </div>
    )
}
export default InterestTag;