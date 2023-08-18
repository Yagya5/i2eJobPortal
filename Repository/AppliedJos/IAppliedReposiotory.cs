using DomainModel.AppliedJob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.MyAppliedJos
{
    public interface IAppliedReposiotory
    {
        IEnumerable<ViewModel_AppliedJob> MyAppliedJobs();
    }
}
