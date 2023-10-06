import create from 'zustand'

const useFilterStore = create(set => ({
     map: null,
     setMap: (object) => set(() => ({ map: object === "Select map" ? null : object})),

     server: null,
     setServer: (object) => set(() => ({server: object === "Select Server" ? null : object})),

     type:null,
     setType: (object) => set(() => ({type: object === "Play Type" ? null : object}))
}))

export default useFilterStore
