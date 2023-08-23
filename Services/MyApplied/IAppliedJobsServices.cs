using DomainModel.AppliedJob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.MyApplied
{
    public interface IAppliedJobsServices
    {
        Task<IEnumerable<ViewModel_AppliedJob>> MyAppliedJobs(int userId);
    }
}
