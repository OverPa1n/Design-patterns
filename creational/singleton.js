function Process(state) {
    this.state = state;
}

const Singleton = (function() {
   function ProcessManager() {
       this.numProcesses = 0;
   }

   let pManager;

   function createProcessManager() {
       pManager = new ProcessManager();

       return pManager;
   }

   return {
       getProcessManager: () => {
           if (!pManager) {
               pManager = createProcessManager();

               return pManager;
           } else {
               return pManager;
           }
       }
   }
})()

const processManager = Singleton.getProcessManager();
const processManager2 = Singleton.getProcessManager();

console.log(processManager === processManager2);
