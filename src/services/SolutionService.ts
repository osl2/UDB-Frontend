import Worksheet from '@/dataModel/Worksheet';

export default interface SolutionService {
    getSolution(sheet: Worksheet): void;
}
