export interface IProjectTask {
    id: string;
    summary: string;
    acceptanceCriteria: string;
    status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
}