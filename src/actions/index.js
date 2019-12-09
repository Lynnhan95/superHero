export const selectHero = (payload) => {
    console.log("You select a hero", payload)
    return {
        type: "SELECT_HERO",
        payload: payload
    }
};