export type Todo = {

  id?: number;
  text: string;
  completed: boolean;

};

export type IState = {
	inputText:string,
	currentItem:number,
	dataModel: any[],
	isLoading:boolean,
	showField:string,
	list:Todo[]
};
