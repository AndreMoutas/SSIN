function AppScreen(props) {
    return (
        <>
            <p style={styles.title}>{props.title}</p>
            {props.children}
        </>
    );
}

const styles = {
    title: {
        fontSize: 36, 
        color: 'white', 
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
    }
}

export default AppScreen;