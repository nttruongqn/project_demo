import * as React from 'react';
import { Helmet } from '../../../../components/Helmet/Helmet';
import { ListPageHeader } from '../../../../components/Admin/Common/ListPageHeader';
import { TotalSection } from '../components/TotalSection';
import { TotalNumberSectionsModel } from '../../../../models/total-sections.model';
import { dashboardApi } from '../../../../api/dashboardApi';
import { Chart } from '../components/Chart';

export interface IDashboardPageProps {
}

export function DashboardPage(props: IDashboardPageProps) {
    const [totalNumberSections, setTotalNumberSections] = React.useState<TotalNumberSectionsModel>()
    const [labels, setLabels] = React.useState<string[]>();
    const [numberTransactionSuccess, setNumberTransactionSuccess] = React.useState<number[]>([])
    const [numberTransactionCancellation, setNumberTransactionCancellation] = React.useState<number[]>([])

 
   
    React.useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const month = currentDate.getMonth();
          
            let labels: string[] = [];
            for (let i = month - 5; i <= month; i++) {
              // Tạo chuỗi tháng với giá trị từ 1 đến 12
              const monthValue = (i % 12) + 1;
              labels.push(`2023-${monthValue}`);
            }
            setLabels(labels);
        
            const data = await dashboardApi.getTotalNumberSections();
            setTotalNumberSections(data);
            if(labels.length > 0) {
                const countTransactionSuccess = await dashboardApi.getTransactionListSuccess({ data: labels });
                const countTransactionCancellation = await dashboardApi.getTransactionListCancellation({ data: labels });
                setNumberTransactionCancellation(countTransactionCancellation);
                setNumberTransactionSuccess(countTransactionSuccess)
            }
        })()
    },[])

  

    return (
        <>
            <Helmet title="Trang tổng quan">
                <div className="w-full h-full flex flex-col justify-between">
                    <ListPageHeader title="Trang tổng quan" />
                    <div className="product__list-center w-full p-5 h-[90%]">
                        <div className="product__list-main shadow-md p-3 z-10">
                         <TotalSection totalNumberSections={totalNumberSections as TotalNumberSectionsModel}/>
                         <div className="my-2 p-3">
                         <Chart labels={labels as string[]} countTransactionSuccess={numberTransactionSuccess} countTransactionCancellation={numberTransactionCancellation} />
                         </div>
                        </div>
                    </div>
                </div>
            </Helmet>
        </>
    );
}
