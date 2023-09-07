using DomainModel.AdminDashboard;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.AdminDashboard
{
    public interface IAdminDashBoardRepository
    {
        //public DataSet GetAdminDashData();

        IEnumerable<Counts> GetCounts();
        IEnumerable<JobDetails> GetJobDetails();

    }
}
