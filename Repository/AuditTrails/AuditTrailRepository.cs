using Dapper;
using DomainModel.AuditLogins;
using DomainModel.AuditTrails;
using DomainModel.Common;
using DomainModel.Users;
using KellermanSoftware.CompareNetObjects;
using Microsoft.AspNetCore.Http;
using Repository.Connection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Repository.AuditTrails
{
    public class AuditTrailRepository : IAuditTrailRepository
    {
        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public AuditTrailRepository(IDapperConnection dapperConnection)
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }


        public bool InsertAuditTrail(int TaskId, string Module, string Action, HttpContext context, Object OldObject, Object NewObject)
        {   
            int UserId = int.Parse(context.User.FindFirst(claim => claim.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            //string ActionMethodName = context.Request.RouteValues.Values.ElementAt(1).ToString();            
            string Url = context.Request.Path.Value;

            CompareLogic compObjects = new CompareLogic();
            compObjects.Config.MaxDifferences = 99;
            ComparisonResult compResult = compObjects.Compare(OldObject, NewObject);

            if(compResult.Differences.Count != 0)
            {
                for(int Index = 0; Index < compResult.Differences.Count; Index++)
                {
                    string DataField = compResult.Differences[Index].PropertyName;
                    string OldValue = compResult.Differences[Index].Object1Value;
                    string NewValue = compResult.Differences[Index].Object2Value;

                    using var connection = _dapperConnection.CreateConnection();
                    var param = new DynamicParameters();
                    param.Add(nameof(AuditTrail.UserId), UserId);
                    param.Add(nameof(AuditTrail.TaskId), TaskId);
                    param.Add(nameof(AuditTrail.OldValue), OldValue);
                    param.Add(nameof(AuditTrail.NewValue), NewValue);
                    param.Add(nameof(AuditTrail.DataField), DataField);
                    param.Add(nameof(AuditTrail.Module), Module);
                    param.Add(nameof(AuditTrail.Url), Url);
                    param.Add(nameof(AuditTrail.Action), Action);
                    connection.Execute(Constant.InsertAuditTrailStoredProcedure, param, null, 0, CommandType.StoredProcedure);

                }
                
                return true;

            }
            else
            {
                return false;
            }
            
        }
        
    }
}
